
import express from "express";

const app = express();
const PORT = 4000;

// Middleware to parse JSON data
app.use(express.json());

// Shopping Cart Array
let cart = [
    {
        id: 1,
        productName: "Wireless Mouse",
        price: 799,
        quantity: 2,
        category: "Electronics"
    },
    {
        id: 2,
        productName: "Keyboard",
        price: 1200,
        quantity: 1,
        category: "Electronics"
    },
    {
        id: 3,
        productName: "Headphones",
        price: 1500,
        quantity: 2,
        category: "Electronics"
    }
];

// 1. GET - Retrieve all cart items
app.get("/cart", (req, res) => {
    res.json(cart);
});

// 2. GET - Retrieve cart item by ID
app.get("/cart/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = cart.find(item => item.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({
        ...product,
        totalPrice: product.price * product.quantity
    });
});

// 3. POST - Add new product
app.post("/cart", (req, res) => {
    const { id, productName, price, quantity, category } = req.body;

    if (!id || !productName || price == null || quantity == null || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (cart.some(item => item.id === Number(id))) {
        return res.status(400).json({ message: "Product ID already exists" });
    }

    const newProduct = {
        id: Number(id),
        productName,
        price: Number(price),
        quantity: Number(quantity),
        category
    };

    cart.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});

// 4. PUT - Update product details
app.put("/cart/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = cart.find(item => item.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const { productName, price, quantity, category } = req.body;

    if (productName !== undefined) product.productName = productName;
    if (price !== undefined) product.price = Number(price);
    if (quantity !== undefined) product.quantity = Number(quantity);
    if (category !== undefined) product.category = category;

    res.json({
        message: "Product updated successfully",
        product
    });
});

// 5. DELETE - Remove product
app.delete("/cart/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = cart.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    cart.splice(index, 1);

    res.json({ message: "Product deleted successfully" });
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
});
