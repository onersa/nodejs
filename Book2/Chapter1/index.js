const http = require("http");
const port = 3000;
const fs = require("fs");

const homePage = fs.readFileSync("index.html");
const aboutPage = fs.readFileSync("about.html");
const contactPage = fs.readFileSync("contact.html");
const notFoundPage = fs.readFileSync("notfound.html");

const server = http.createServer((req, res) => {
    if (req.url === "/about")
        res.end(aboutPage);
    else if (req.url === "/contact")
        res.end(contactPage);
    else if (req.url === "/")
        res.end(homePage);
    else {
        res.writeHead(404);
        res.end(notFoundPage);
    }
}
);

// const server = http.createServer((req, res) => {
//     console.log(req.url);
//     if (req.url === '/')
//         res.end("You have reached the home page");
//     else if(req.url === "/contact") 
//         res.end("Your have reached the contact page");
//     else if (req.url ==="/about")
//         res.end("You have reache the abot page");
//     else {
//         res.writeHead(404),
//         res.end("page not found");
//     }

// });

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});