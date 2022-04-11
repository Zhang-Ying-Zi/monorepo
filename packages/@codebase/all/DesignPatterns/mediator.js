"use strict";
var Stock = /** @class */ (function () {
  function Stock() {}
  Stock.prototype.increase = function (number) {
    Stock.COMPUTER_NUMBER += number;
    console.log("\u5E93\u5B58\u6570\u91CF\u4E3A : " + Stock.COMPUTER_NUMBER);
  };
  Stock.prototype.decrease = function (number) {
    Stock.COMPUTER_NUMBER -= number;
    console.log("\u5E93\u5B58\u6570\u91CF\u4E3A : " + Stock.COMPUTER_NUMBER);
  };
  Stock.prototype.getStockNumber = function () {
    return Stock.COMPUTER_NUMBER;
  };
  Stock.prototype.clearStock = function () {
    var purchase = new Purchase();
    var sale = new Sale();
    console.log(
      "\u6E05\u7406\u5E93\u5B58\u6570\u91CF\u4E3A : " + Stock.COMPUTER_NUMBER
    );
    sale.offSale();
    purchase.refuseBuyIBMcomputer();
  };
  Stock.COMPUTER_NUMBER = 100;
  return Stock;
})();
var Purchase = /** @class */ (function () {
  function Purchase() {}
  Purchase.prototype.buyIBMcomputer = function (number) {
    var stock = new Stock();
    var sale = new Sale();
    var saleStatus = sale.getSaleStatus();
    if (saleStatus > 80) {
      console.log("\u91C7\u8D2D IBM \u7535\u8111 : " + number + " \u53F0");
      stock.increase(number);
    } else {
      var buyNumber = number / 2;
      console.log("\u91C7\u8D2D IBM \u7535\u8111 : " + buyNumber + " \u53F0");
      stock.increase(buyNumber);
    }
  };
  Purchase.prototype.refuseBuyIBMcomputer = function () {
    console.log("\u4E0D\u518D\u91C7\u8D2D IBM \u7535\u8111 ");
  };
  return Purchase;
})();
var Sale = /** @class */ (function () {
  function Sale() {}
  Sale.prototype.sellIBMcomputer = function (number) {
    var stock = new Stock();
    var purchase = new Purchase();
    if (stock.getStockNumber() < number) {
      purchase.buyIBMcomputer(number);
    }
    console.log("\u9500\u552E IBM \u7535\u8111 : " + number + " \u53F0");
    stock.decrease(number);
  };
  Sale.prototype.getSaleStatus = function () {
    var rand = Math.random();
    var saleStatus = Math.floor(rand * 100);
    console.log(
      "IBM \u7535\u8111\u7684\u9500\u552E\u60C5\u51B5\u4E3A : " +
        saleStatus +
        " \u53F0"
    );
    return saleStatus;
  };
  Sale.prototype.offSale = function () {
    var stock = new Stock();
    console.log(
      "\u6298\u4EF7\u9500\u552EIBM \u7535\u8111 : " +
        stock.getStockNumber() +
        " \u53F0"
    );
    stock.decrease(stock.getStockNumber());
  };
  return Sale;
})();
console.log("----\u91C7\u8D2D\u4EBA\u5458\u91C7\u8D2D\u7535\u8111----");
var purchase = new Purchase();
purchase.buyIBMcomputer(100);
console.log("----\u9500\u552E\u4EBA\u5458\u9500\u552E\u7535\u8111----");
var sale = new Sale();
sale.sellIBMcomputer(1);
console.log("----\u5E93\u7BA1\u4EBA\u5458\u6E05\u7406\u5E93\u5B58----");
var stock = new Stock();
stock.clearStock();
