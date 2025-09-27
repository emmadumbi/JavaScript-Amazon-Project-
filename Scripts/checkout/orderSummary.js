import personalCart from '../../data/cart-class.js'
import { products, getProductId } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/delivery.js';
import { renderPaymentSummary } from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';


export function renderOrderSumary() {
  let cartSummaryHtml = '';
  
  personalCart.cartItems.forEach((cartItem) => {
    const matchingItem = getProductId(cartItem);
    
    const matchingDeliveryOption = getDeliveryOption(cartItem);
    
    const dateText = calculateDeliveryDate(matchingDeliveryOption.deliveryDay);
    
    cartSummaryHtml += `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
          <div class="delivery-date">
            Delivery date: ${dateText}
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
              ${renderDeliveryOptions(matchingItem, cartItem)}
            </div>
          </div>
        </div>
  `
  });
  
  function renderDeliveryOptions(matchingItem, cartItem) {
    let deliveryHtml = '';
    
    deliveryOptions.forEach((deliveryOption) => {
      const dateText = calculateDeliveryDate(deliveryOption.deliveryDay);
      
      const priceText = deliveryOption.priceCent === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCent)} -`
      
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      deliveryHtml +=
        `
      <div data-product-id="${matchingItem.id}" data-delivery-option-id="${deliveryOption.id}" class="delivery-option js-delivery-option">
        <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
            ${dateText}
          </div>
          <div class="delivery-option-price">
            ${priceText} Shipping
          </div>
        </div>
      </div>
    `
    });
    
    return deliveryHtml;
  };
  
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;
  
  function showEachItemQuantity() {
    personalCart.cartItems.forEach((cartItem) => {
      document.querySelector(`.js-quantity-label-${cartItem.productId}`).textContent = cartItem.quantity;
    });
  };
  showEachItemQuantity();
  
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      personalCart.removeCartItem(productId);
      
      renderCheckoutHeader();
      renderPaymentSummary();
      renderOrderSumary();
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
      
      personalCart.addToCart(productId, newQuantity);
      
      renderCheckoutHeader();
      showEachItemQuantity();
      renderPaymentSummary();
      
      const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      
      cartItemContainer.classList.remove('is-editing-quantity');
    });
  });
  
  document.querySelectorAll('.js-delivery-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const { deliveryOptionId, productId } = btn.dataset;
      
      personalCart.updateDeliveryOptionId(productId, deliveryOptionId);
      
      renderOrderSumary();
      renderPaymentSummary();
    });
  });
};