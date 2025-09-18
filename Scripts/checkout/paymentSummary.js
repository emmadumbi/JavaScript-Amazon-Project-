import {cart, calculateCartQuantity} from '../../data/cart.js';
import {products, getProductId} from '../../data/products.js';
import {deliveryOptions, getDeliveryOption} from '../../data/delivery.js';
import {formatCurrency} from '../utils/money.js';

export function renderPaymentSummary() {
  let priceQuantity = 0;
  
  let shippingPrice = 0;
  
  let summaryHtml = '';
  
  cart.forEach((cartItem)=>{
    
    const matchingCartItem = getProductId(cartItem);
    
    priceQuantity += matchingCartItem.priceCents * cartItem.quantity;
    
    const matchingDeliveryItem = getDeliveryOption(cartItem);
    
    shippingPrice += matchingDeliveryItem;
    
  });
  
  const totalBeforeTax = priceQuantity + shippingPrice;
  
  const tax = (totalBeforeTax * 10) / 100;
  
  const total = totalBeforeTax + tax;
  
  
  const cartQuantity = calculateCartQuantity();
  
  summaryHtml += `
        <div class="payment-summary-title">
          Order Summary
        </div>
        
        <div class="payment-summary-row">
          <div>Items (${cartQuantity}):</div>
          <div class="payment-summary-money">$${formatCurrency(priceQuantity)}</div>
        </div>
        
        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
        </div>
        
        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>
        
        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(tax)}</div>
        </div>
        
        <div class="payment-summary-row total-row">
          <div>Total Order:</div>
          <div class="payment-summary-money">$${formatCurrency(total)}</div>
        </div>
        
        <button class="place-order-button button-primary">
          Place your order
        </button>
  `
  document.querySelector('.js-payment-summary').innerHTML = summaryHtml;
};