// Cart Management Logic

// Get cart from local storage
function getCart() {
    const cart = localStorage.getItem('shoppingCart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to local storage
function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    
    // Show feedback if UI element exists
    const msg = document.getElementById('feedback');
    if (msg) {
        msg.style.display = 'block';
        msg.innerText = "✅ Added to Cart";
        setTimeout(() => msg.style.display = 'none', 2000);
    }
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    return cart; // Return updated cart for UI update
}

// Update item quantity
function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart(cart);
        }
    }
    return getCart();
}

// Clear cart
function clearCart() {
    localStorage.removeItem('shoppingCart');
    updateCartCount();
}

// Update cart count in UI (if exists)
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countEl = document.getElementById('cartCount');
    if (countEl) {
        countEl.innerText = count;
        countEl.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

// Initialize count on load
document.addEventListener('DOMContentLoaded', updateCartCount);
