import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

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
  
  return matchingItem;
};

/*export function calculateDeliveryDate(param) {
  const today = dayjs();
  
  const deliveryDate = today.add(param.deliveryDay, 'days');
  
  const dateText = deliveryDate.format('dddd, MMMM D');
  
  return dateText;
}*/
export function calculateDeliveryDate(daysToAdd) {
  let date = dayjs();
  let added = 0;
  
  while (added < daysToAdd) {
    date = date.add(1, "day");
    const dayOfWeek = date.day();
    
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      added++;
    }
    
  };
  return date.format('dddd (DD), MMMM YYYY');
};