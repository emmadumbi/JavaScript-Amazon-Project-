import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import {formatCurrency} from './utils/money.js';

const productsContainer = document.querySelector(".products-grid");
const cartQuantityText = document.querySelector(".js-cart-quantity");

let productHtml = "";
products.forEach((product) => {
  productHtml += `
            <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="quantity-selector">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button data-product-id="${product.id}" class="add-to-cart-button button-primary">
            Add to cart
          </button>
        </div>
  `
});

productsContainer.innerHTML = productHtml;
const addTocartBtn = document.querySelectorAll(".add-to-cart-button");

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  
  cartQuantityText.textContent = cartQuantity;
}

addTocartBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId = btn.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
});