function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    
    loadFromCart() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
      
      if (!this.cartItems) {
        this.cartItems = [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '3'
        }];
      }
      
      this.saveToLocalStorage();
    },
    
    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    
    
    addToCart(productId, quantity) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        };
      });
      
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          productId,
          quantity,
          deliveryOptionId: '1'
        });
      };
      this.saveToLocalStorage();
    },
    
    calculateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
    },
    
    removeCartItem(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        };
      });
      this.cartItems = newCart;
      this.saveToLocalStorage();
    },
    
    updateDeliveryOptionId(productId, deliveryOptionId) {
      let matchingItem;
      
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        };
      });
      
      matchingItem.deliveryOptionId = deliveryOptionId;
      
      this.saveToLocalStorage();
    }
  }
  
  return cart;
}

const personalCart = Cart('cart-oop');
const businessCart = Cart('business-cart');
personalCart.loadFromCart();
businessCart.loadFromCart();

console.log(personalCart);
console.log(businessCart);