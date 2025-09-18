export const deliveryOptions = [{
  id: '1',
  deliveryDay: 7,
  priceCent: 0
},
{
  id: '2',
  deliveryDay: 3,
  priceCent: 499
},
{
  id: '3',
  deliveryDay: 1,
  priceCent: 999
}];


export function getDeliveryOption(cartItem) {
  let matchingItem;
  deliveryOptions.forEach((deliveryOption) => {
    const deliveryOptionId = deliveryOption.id;
    
    if (cartItem.deliveryOptionId === deliveryOptionId) {
      
      matchingItem = deliveryOption;
    };
  });
  
  return matchingItem.priceCent;
}