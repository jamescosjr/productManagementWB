export function validateProduct(name, category, price, stock) {
    if (typeof name !== 'string' || name.trim() === '') {
        return { valid: false, message: 'The name should be a valid string' };
    }
    if (typeof category !== 'string' || category.trim() === '') {
        return { valid: false, message: 'The category should be a valid string' };
    }
    if (typeof price !== 'number') {
        return { valid: false, message: 'The price should be a valid number' };
    }
    if (!Number.isInteger(stock)) {
        return { valid: false, message: 'The stock should be a valid integer' };
    }
    return { valid: true };
}