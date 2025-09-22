import {calculateCartQuantity} from '../../data/cart.js';


export function renderCheckoutHeader(){
  const cartQuantity = calculateCartQuantity();
  let header = '';
  
  const itemText = cartQuantity > 1 ? 'items' : 'item'
  
  header += `
    Checkout (<a class="return-to-home-link js-return-home-link" href="index.html">${cartQuantity} ${itemText}</a>)
  `
  
  document.querySelector('.js-checkout-header').innerHTML = header;
};

