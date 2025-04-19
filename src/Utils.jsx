
export const isEmpty = (str) => {
    return !str || !str.trim();
}

export const isCurrency = (n) => {
    // Check if the input is a positive number and at most 2 digits under decimal point. 
    if (isEmpty(n)) return false; // undefined or empty

    n = Number(n);
    if (isNaN(n) || n < 0 || (n * 100) - Math.floor(n * 100) != 0) {
        return false;
    } else {
        return true;
    }
}

export const isNaturalNumber = (n) => {
    // Check if the input is a positive integer 
    if (isEmpty(n))  return false; // undefined or empty

    n = Number(n);
    if (isNaN(n) || !Number.isInteger(n) || n <= 0) {
        return false;
    }
    return true;
}

export const isPositive = (n) => {
    // Check if the input is a positive number 
    if (isEmpty(n))  return false; // undefined or empty

    n = Number(n);
    if (isNaN(n) || n < 0) {
        return false;
    }
    return true;
}

