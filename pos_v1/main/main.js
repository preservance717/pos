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
