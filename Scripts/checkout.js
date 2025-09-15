import { cart, removeCartItem, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHtml = '';
let matchingItem;

cart.forEach((cartItem) => {
  const cartProductId = cartItem.productId;
  products.forEach((product) => {
    if (cartProductId === product.id) {
      matchingItem = product;
    };
  });
  
  cartSummaryHtml += `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>
          
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingItem.image}">
            
            <div class="cart-item-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingItem.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}"></span>
                </span>
                <span data-product-id="${matchingItem.id}" class="update-quantity-link link-primary">
                  Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingItem.id}" />
                <span data-product-id="${matchingItem.id}" class="save-quantity-link link-primary">Save</span>
                <span data-product-id="${matchingItem.id}" class="delete-quantity-link link-primary js-delete-link">
                  Delete
                </span>
              </div>
            </div>
            
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="${matchingItem.id}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="${matchingItem.id}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="${matchingItem.id}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  `
});

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  
  document.querySelector('.js-return-home-link').innerHTML = cartQuantity > 1 ? `${cartQuantity} items` : `${cartQuantity} item`;
};
updateCartQuantity();

document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

function showEachItemQuantity() {
  cart.forEach((cartItem)=>{
    document.querySelector(`.js-quantity-label-${cartItem.productId}`).textContent = cartItem.quantity;
  });
};
showEachItemQuantity();

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeCartItem(productId);
    
    const productContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    
    productContainer.remove();
    
    updateCartQuantity();
  });
});

document.querySelectorAll('.update-quantity-link').forEach((btn) => {
  btn.addEventListener('click', () => {
    const productId = btn.dataset.productId;
    
    const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    
    cartItemContainer.classList.add('is-editing-quantity');
  });
});

document.querySelectorAll(".save-quantity-link").forEach((btn) => {
  btn.addEventListener('click', () => {
    const productId = btn.dataset.productId;
    
    const inputValue = document.querySelector(`.js-quantity-input-${productId}`).value;
    
    const newQuantity = Number(inputValue);
    
    document.querySelector(`.js-quantity-input-${productId}`).value = "";
    
    addToCart(productId, newQuantity);
    updateCartQuantity();
    showEachItemQuantity();
    
    const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    
    cartItemContainer.classList.remove('is-editing-quantity');
  });
});