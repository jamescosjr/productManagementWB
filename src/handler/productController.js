import productRepository from "../repository/productRepository.js";
import { validateProduct } from "../utils/productValidator.js";

export function createProductHandler(req, res) {
  const product = req.body;
  const isValidProduct = validateProduct(product);
  if (!isValidProduct) {
    return res.status(400).json({ error: "Invalid product" });
  }

  try {
    const newProduct = productRepository.createProduct(product);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export function getProductsHandler(req, res) {
  try {
    const products = productRepository.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export function getProductByIdHandler(req, res) {
  const productId = req.params.id;
  try {
    const product = productRepository.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export function getProductsByCategoryHandler(req, res) {
  const category = req.params.category;
  try {
    const products = productRepository.getProductsByCategory(category);
    if (!products.length) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export function getProductsByPriceHandler(req, res) {
  const price = parseFloat(req.params.price);
  try {
    const products = productRepository.getProductsByPrice(price);
    if (!products.length) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export function getProductsByStockHandler(req, res) {
  const stock = parseInt(req.params.stock);
  try {
    const products = productRepository.getProductsByStock(stock);
    if (!products.length) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
