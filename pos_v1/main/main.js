'use strict';

function printReceipt(inputs) {
  const loadItems = loadAllItems();
  let cartItems = buildCartItems(inputs, loadItems);
}

function isExistDash(item, cartItems) {
  let existDash = item.barcode.split("-");

  for (let i = 0; i < cartItems.length; i++) {
    if (existDash[1]) {
      cartItems.push({
        barcode: item.barcode,
        name: item.name,
        price: item.price.toFixed(2),
        unit: item.unit,
        count: parseInt(existDash[1])
      });

      return cartItems;
    } else {
      if (cartItems[i].barcode === item.barcode) {
        cartItems[i].count++;

        return cartItems;
      }
    }
  }
  if (existDash[1]) {
    cartItems.push({
      barcode: item.barcode,
      name: item.name,
      price: item.price.toFixed(2),
      unit: item.unit,
      count: parseInt(existDash[1])
    });
  } else {
    cartItems.push({
      barcode: item.barcode,
      name: item.name,
      price: item.price.toFixed(2),
      unit: item.unit,
      count: 1
    });
  }

  return cartItems;
}

function buildCartItems(inputs, loadItems) {
  let cartItems = [];
  let items = buildItems(inputs, loadItems);

  items.forEach(function (item) {
    cartItems = isExistDash(item, cartItems);
  });

  return cartItems;
}

function buildItems(inputs, loadItems) {
  let items = [];

  inputs.forEach(function (input) {
    let existDash = input.split("-");
    for (let i = 0; i < loadItems.length; i++) {
      if (existDash[0] === loadItems[i].barcode) {
        items.push({
          barcode: input, name: loadItems[i].name,
          unit: loadItems[i].unit, price: loadItems[i].price
        });
      }
    }
  });

  return items;
}
