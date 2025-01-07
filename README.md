

Here's a structured README for your project based on the provided endpoints:

---

# Product Management API

This API provides a set of endpoints to manage a collection of products, including functionalities to create, retrieve, update, and delete product records. 

## Features
- **Create a new product**
- **Retrieve products by various criteria**
- **Update product details**
- **Delete a product**

## Endpoints

### 1. **Create a Product**
- **Method**: `POST`
- **Endpoint**: `/products`
- **Description**: Creates a new product record.
- **Request Body**:
  ```json
  {
    "name": "string",
    "category": "string",
    "price": "number",
    "stock": "number"
  }
  ```
- **Response**:
  - `201 Created`: Product successfully created.
  - `400 Bad Request`: Invalid input.

---

### 2. **Get All Products**
- **Method**: `GET`
- **Endpoint**: `/products`
- **Description**: Retrieves all products.
- **Response**:
  - `200 OK`: Returns an array of product objects.

---

### 3. **Get Product by ID**
- **Method**: `GET`
- **Endpoint**: `/products/:id`
- **Description**: Retrieves a product by its unique ID.
- **Response**:
  - `200 OK`: Returns the product object.
  - `404 Not Found`: Product with the specified ID does not exist.

---

### 4. **Get Products by Category**
- **Method**: `GET`
- **Endpoint**: `/products/category/:category`
- **Description**: Retrieves all products belonging to a specific category.
- **Response**:
  - `200 OK`: Returns an array of product objects.
  - `404 Not Found`: No products found for the specified category.

---

### 5. **Get Products by Price**
- **Method**: `GET`
- **Endpoint**: `/products/price/:price`
- **Description**: Retrieves all products with a specific price.
- **Response**:
  - `200 OK`: Returns an array of product objects.
  - `404 Not Found`: No products found with the specified price.

---

### 6. **Get Products by Stock**
- **Method**: `GET`
- **Endpoint**: `/products/stock/:stock`
- **Description**: Retrieves all products with a specific stock quantity.
- **Response**:
  - `200 OK`: Returns an array of product objects.
  - `404 Not Found`: No products found with the specified stock quantity.

---

### 7. **Update a Product**
- **Method**: `PUT`
- **Endpoint**: `/products/:id`
- **Description**: Updates the details of a product by its ID.
- **Request Body**:
  ```json
  {
    "name": "string",
    "category": "string",
    "price": "number",
    "stock": "number"
  }
  ```
- **Response**:
  - `200 OK`: Product successfully updated.
  - `404 Not Found`: Product with the specified ID does not exist.
  - `400 Bad Request`: Invalid input.

---

### 8. **Delete a Product**
- **Method**: `DELETE`
- **Endpoint**: `/products/:id`
- **Description**: Deletes a product by its ID.
- **Response**:
  - `200 OK`: Product successfully deleted.
  - `404 Not Found`: Product with the specified ID does not exist.

---

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Technologies Used
- **Node.js**: Server-side runtime.
- **Express.js**: Framework for building RESTful APIs.
- **Database**: MongoDB.

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.


--- 

Feel free to adapt the above content to fit your project's specifics!
