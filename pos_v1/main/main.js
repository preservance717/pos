'use strict';


let buildCartItems = (tags, allItems) => {
  let cartItems = [];

  for (let tag of tags) {
    let spilttedTag = tag.split('-');
    let barcode = spilttedTag[0];
    let count = parseFloat(spilttedTag[1] || 1);

    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);

    if (cartItem) {
      cartItem.count++;
    } else {
      let item = allItems.find(item => item.barcode === barcode);

      cartItems.push({item: item, count: count});
    }
  }

  return cartItems;
}

/* let buildReceiptItems = (cartItems, promotions) => {
 let receiptItems = [];

 for (let cartItem of cartItems) {
 /!* let promotion = promotions.find(promotion => promotion.type === 'BUY_TWO_GET_ONE_FREE');
 let barcode = promotion.barcodes.find(barcode => cartItem.item.barcode === barcode);*!/
 for (let promotion of promotions) {
 if (promotion.type === 'BUY_TWO_GET_ONE_FREE') {
 let barcode = promotion.barcodes.find(barcode => cartItem.item.barcode === barcode);
 if (barcode) {
 receiptItems.push({
 cartItem: cartItem,
 subtotal: cartItem.item.price * (cartItem.count - parseInt(cartItem.count / 3)),
 saved: cartItem.item.price * parseInt(cartItem.count / 3)
 });
 } else {
 receiptItems.push({
 cartItem: cartItem,
 subtotal: cartItem.item.price * cartItem.count,
 saved: 0.00
 });
 }
 }
 }
 }

 return receiptItems;
 }*/

let buildReceiptItems = (cartItems, promotions) => {
  return cartItems.map(cartItem => {
    let promotionType = getPromotionType(cartItem.item.barcode, promotions);
    let {subtotal, saved} = discount(cartItem, promotionType);

    return {cartItem, subtotal, saved}
  });
}

let getPromotionType = (barcode, promotions) => {
  let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode));
  return promotion ? promotion.type : '';
}

let discount = (cartItem, promotionType) => {
  let saved = 0;

  if (promotionType === 'BUY_TWO_GET_ONE_FREE') {
    saved = cartItem.item.price * parseInt(cartItem.count / 3);
  }
  let subtotal = cartItem.item.price * parseInt(cartItem.count) - saved;

  return {subtotal, saved}
}
