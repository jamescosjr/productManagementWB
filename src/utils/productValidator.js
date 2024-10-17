export function isValidString(str) { return typeof str === 'string' && str.trim() !== '' };

export function isValidNumber(number) { return typeof number === 'number' && number > 0 };

export function validateProduct(product) {
    if (!isValidString(product.name)) {
        return false;
    }
    if (!isValidString(product.category)) {
        return false;
    }
    if (!isValidNumber(product.price)) {
        return false;
    }
    if (!isValidNumber(product.stock)) {
        return false;
    }
    return true;
}