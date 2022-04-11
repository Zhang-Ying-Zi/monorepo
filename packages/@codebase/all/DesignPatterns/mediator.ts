class Stock {
  static COMPUTER_NUMBER = 100;
  increase(number: number) {
    Stock.COMPUTER_NUMBER += number;
    console.log(`库存数量为 : ${Stock.COMPUTER_NUMBER}`);
  }
  decrease(number: number) {
    Stock.COMPUTER_NUMBER -= number;
    console.log(`库存数量为 : ${Stock.COMPUTER_NUMBER}`);
  }
  getStockNumber() {
    return Stock.COMPUTER_NUMBER;
  }
  clearStock() {
    const purchase: Purchase = new Purchase();
    const sale: Sale = new Sale();
    console.log(`清理库存数量为 : ${Stock.COMPUTER_NUMBER}`);
    sale.offSale();
    purchase.refuseBuyIBMcomputer();
  }
}

class Purchase {
  buyIBMcomputer(number: number) {
    const stock: Stock = new Stock();
    const sale: Sale = new Sale();
    const saleStatus: number = sale.getSaleStatus();
    if (saleStatus > 80) {
      console.log(`采购 IBM 电脑 : ${number} 台`);
      stock.increase(number);
    } else {
      const buyNumber: number = number / 2;
      console.log(`采购 IBM 电脑 : ${buyNumber} 台`);
      stock.increase(buyNumber);
    }
  }
  refuseBuyIBMcomputer() {
    console.log(`不再采购 IBM 电脑 `);
  }
}

class Sale {
  sellIBMcomputer(number: number) {
    const stock: Stock = new Stock();
    const purchase: Purchase = new Purchase();
    if (stock.getStockNumber() < number) {
      purchase.buyIBMcomputer(number);
    }
    console.log(`销售 IBM 电脑 : ${number} 台`);
    stock.decrease(number);
  }
  getSaleStatus(): number {
    const rand: number = Math.random();
    const saleStatus: number = Math.floor(rand * 100);
    console.log(`IBM 电脑的销售情况为 : ${saleStatus} 台`);
    return saleStatus;
  }
  offSale() {
    const stock: Stock = new Stock();
    console.log(`折价销售IBM 电脑 : ${stock.getStockNumber()} 台`);
    stock.decrease(stock.getStockNumber());
  }
}

console.log(`----采购人员采购电脑----`);
const purchase: Purchase = new Purchase();
purchase.buyIBMcomputer(100);
console.log(`----销售人员销售电脑----`);
const sale: Sale = new Sale();
sale.sellIBMcomputer(1);
console.log(`----库管人员清理库存----`);
const stock: Stock = new Stock();
stock.clearStock();
