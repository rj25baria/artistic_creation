const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');
const productsFile = path.join(dataDir, 'products.json');
const ordersFile = path.join(dataDir, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const initFile = (file) => {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify([], null, 2));
    }
};

initFile(usersFile);
initFile(productsFile);
initFile(ordersFile);

const readJson = (file) => {
    try {
        const data = fs.readFileSync(file);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeJson = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

module.exports = {
    readUsers: () => readJson(usersFile),
    writeUsers: (data) => writeJson(usersFile, data),
    readProducts: () => readJson(productsFile),
    writeProducts: (data) => writeJson(productsFile, data),
    readOrders: () => readJson(ordersFile),
    writeOrders: (data) => writeJson(ordersFile, data)
};
