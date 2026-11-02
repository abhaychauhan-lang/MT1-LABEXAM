
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Current directory find karna
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Shopping cart array
let cart = [
    {
        id: 1,
        productName: "Wireless Mouse",
        price: 799,
        quantity: 2
    }
];

// HTTP Server create karna
const server = http.createServer((req, res) => {

    // A1: Home route
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end("<h1>Welcome to Shopping Cart Application</h1>");
    }

    // A2: About route
    else if (req.method === "GET" && req.url === "/about") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end("<h1>About Shopping Cart Management Application</h1>");
    }

    // A3: Get all cart items
    else if (req.method === "GET" && req.url === "/cart") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(cart));
    }

    // A4: Serve HTML file using FS module
    else if (req.method === "GET" && req.url === "/home") {

        const filePath = path.join(__dirname, "public", "index.html");

        fs.readFile(filePath, "utf8", (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error reading HTML file");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });
    }

    // A5: Add product to cart
    else if (req.method === "POST" && req.url === "/add-to-cart") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            try {
                const product = JSON.parse(body);

                const { id, productName, price, quantity } = product;

                // Validate product details
                if (
                    !Number.isInteger(id) ||
                    typeof productName !== "string" ||
                    productName.trim() === "" ||
                    typeof price !== "number" ||
                    !Number.isFinite(price) ||
                    price < 0 ||
                    !Number.isInteger(quantity) ||
                    quantity <= 0
                ) {
                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        message: "Invalid product details"
                    }));

                    return;
                }

                // Check duplicate ID
                const existingProduct = cart.find(
                    item => item.id === id
                );

                if (existingProduct) {
                    res.writeHead(409, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        message: "Product ID already exists"
                    }));

                    return;
                }

                // Add product
                cart.push(product);

                res.writeHead(201, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Product added successfully",
                    product: product
                }));

            } catch (error) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Invalid JSON format"
                }));
            }
        });
    }

    // Invalid routes
    else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 - Page Not Found");
    }
});

// Start server
server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});
