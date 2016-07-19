'use strict';

describe('pos', () => {
  let inputs;
  let allItems;
  let promotions;
  let cartItems;

  beforeEach(() => {
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
    allItems = loadAllItems();
    promotions = loadPromotions();
    cartItems = [{
      item: {
        barcode: "ITEM000001",
        name: "雪碧",
        unit: "瓶",
        price: 3.00
      },
      count: 5
    },
      {
        item: {
          barcode: "ITEM000003",
          name: "荔枝",
          unit: "斤",
          price: 15.00
        },
        count: 2
      },
      {
        item: {
          barcode: "ITEM000005",
          name: "方便面",
          unit: "袋",
          price: 4.50
        },
        count: 3
      }];
  });

  it('should print correct text', () => {

    spyOn(console, 'log');

 //   printReceipt(inputs);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });

  it('should print cartItems', () => {
    let cartItems = buildCartItems(inputs, allItems);
    const expectCartItems = [
      {
        item: {
          barcode: "ITEM000001",
          name: "雪碧",
          unit: "瓶",
          price: 3.00
        },
        count: 5
      },
      {
        item: {
          barcode: "ITEM000003",
          name: "荔枝",
          unit: "斤",
          price: 15.00
        },
        count: 2
      },
      {
        item: {
          barcode: "ITEM000005",
          name: "方便面",
          unit: "袋",
          price: 4.50
        },
        count: 3
      }
    ];

    expect(cartItems).toEqual(expectCartItems);
  });

  it('when barcode no bash', () => {
    let barcodes = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];

    let cartItems = buildCartItems(barcodes, allItems);
    const expectCartItems = [
      {
        item: {
          barcode: "ITEM000001",
          name: "雪碧",
          unit: "瓶",
          price: 3.00
        },
        count: 5
      },
      {
        item: {
          barcode: "ITEM000005",
          name: "方便面",
          unit: "袋",
          price: 4.50
        },
        count: 3
      }
    ];

    expect(cartItems).toEqual(expectCartItems);
  });

  it('when after dash number is digit', () => {
    let barcode = ['ITEM000003-2'];
    let cartItems = buildCartItems(barcode, allItems);
    const expectCartItems = [{
      item: {
        barcode: "ITEM000003",
        name: "荔枝",
        unit: "斤",
        price: 15.00
      },
      count: 2
    }];

    expect(cartItems).toEqual(expectCartItems);
  });

  it('when after dash number is digit', () => {
    let barcode = ['ITEM000003-1.5'];
    let cartItems = buildCartItems(barcode, allItems);
    const expectCartItems = [{
      item: {
        barcode: "ITEM000003",
        name: "荔枝",
        unit: "斤",
        price: 15.00
      },
      count: 1.5
    }];

    expect(cartItems).toEqual(expectCartItems);
  });

  it('should print receiptItems', () => {

    var receiptItems = buildReceiptItems(cartItems, promotions);
    var expectReceiptItems = [
      {
        cartItem: {
          item: {
            barcode: "ITEM000001",
            name: "雪碧",
            unit: "瓶",
            price: 3.00
          },
          count: 5
        },
        subtotal: 12.00,
        saved: 3.00
      },
      {
        cartItem: {
          item: {
            barcode: "ITEM000003",
            name: "荔枝",
            unit: "斤",
            price: 15.00
          },
          count: 2
        },
        subtotal: 30.00,
        saved: 0.00
      },
      {
        cartItem: {
          item: {
            barcode: "ITEM000005",
            name: "方便面",
            unit: "袋",
            price: 4.50
          },
          count: 3
        },
        subtotal: 9.00,
        saved: 4.50
      }
    ];

    expect(receiptItems).toEqual(expectReceiptItems);
  });
});
