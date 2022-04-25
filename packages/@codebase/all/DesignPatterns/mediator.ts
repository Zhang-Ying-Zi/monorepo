abstract class AbstractMediator {
  protected purchase: Purchase;
  protected sale: Sale;
  protected stock: Stock;
  constructor() {
    this.purchase = new Purchase(this);
    this.sale = new Sale(this);
    this.stock = new Stock(this);
  }
  abstract execute(str: string, ...objects: number[]): void;
}

class Mediator extends AbstractMediator {
  execute(str: string, ...objects: number[]) {
    switch (str) {
      case "purchase.buy":
        this.buyComputer(objects[0]);
        break;
      case "sale.sell":
        this.sellComputer(objects[0]);
        break;
      case "sale.offsale":
        this.offSell();
        break;
      case "stock.clear":
        this.clearStock();
        break;
    }
  }

  buyComputer(number: number) {
    const saleStatus: number = this.sale.getSaleStatus();
    if (saleStatus > 80) {
      console.log(`采购 IBM 电脑 : ${number} 台`);
      this.stock.increase(number);
    } else {
      const buyNumber: number = number / 2;
      console.log(`采购 IBM 电脑 : ${buyNumber} 台`);
      this.stock.increase(buyNumber);
    }
  }

  sellComputer(number: number) {
    if (this.stock.getStockNumber() < number) {
      this.purchase.buyIBMcomputer(number);
    }
    console.log(`销售 IBM 电脑 : ${number} 台`);
    this.stock.decrease(number);
  }

  offSell() {
    console.log(`折价销售IBM 电脑 : ${this.stock.getStockNumber()} 台`);
    this.stock.decrease(stock.getStockNumber());
  }

  clearStock() {
    console.log(`清理库存数量为 : ${Stock.COMPUTER_NUMBER}`);
    this.sale.offSale();
    this.purchase.refuseBuyIBMcomputer();
  }
}

abstract class AbstractColleague {
  protected mediator: AbstractMediator;
  constructor(mediator: AbstractMediator) {
    this.mediator = mediator;
  }
}

class Stock extends AbstractColleague {
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
    this.mediator.execute("stock.clear");
  }
}

class Purchase extends AbstractColleague {
  buyIBMcomputer(number: number) {
    this.mediator.execute("purchase.buy", number);
  }
  refuseBuyIBMcomputer() {
    console.log(`不再采购 IBM 电脑 `);
  }
}

class Sale extends AbstractColleague {
  sellIBMcomputer(number: number) {
    this.mediator.execute("sale.sell", number);
  }
  getSaleStatus(): number {
    const rand: number = Math.random();
    const saleStatus: number = Math.floor(rand * 100);
    console.log(`IBM 电脑的销售情况为 : ${saleStatus} 台`);
    return saleStatus;
  }
  offSale() {
    this.mediator.execute("sale.offsell");
  }
}

const mediator: AbstractMediator = new Mediator();
console.log(`----采购人员采购电脑----`);
const purchase: Purchase = new Purchase(mediator);
purchase.buyIBMcomputer(100);
console.log(`----销售人员销售电脑----`);
const sale: Sale = new Sale(mediator);
sale.sellIBMcomputer(1);
console.log(`----库管人员清理库存----`);
const stock: Stock = new Stock(mediator);
stock.clearStock();
