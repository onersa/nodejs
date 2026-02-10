const httpStatus = require("http-status-codes");
const contentTypes = require("./contentTypes");
const utils = require("./utils");
// =======================================================================
// This is a basic HTTP router module for Node.js with three main parts:
// **Route storage:** Maintains a `routes` object with separate collections 
// for GET and POST request handlers.
// **Request handling:** The `handle` function routes incoming requests to 
//  their registered handlers based on HTTP method and URL. If no handler 
// exists or an error occurs, it serves an error page.
// **Route registration:** Provides `get()` and `post()` 
// methods to register handler functions for specific URLs.
// The router uses exact URL matching—when a request comes in, 
// it looks up `routes[method][url]` and executes the corresponding function.
//  Any failures trigger a fallback error page.
// =======================================================================

const routes = {
 "GET": {},
 "POST": {}
};
exports.handle = (req, res) => {
 try {
 routes[req.method][req.url](req, res);
 } catch (e) {
 res.writeHead(httpStatus.StatusCodes.OK, contentTypes.html);
 utils.getFile("views/error.html", res);
 }
};
exports.get = (url, action) => {
 routes["GET"][url] = action;
};
exports.post = (url, action) => {
  routes["POST"][url] = action;
};

