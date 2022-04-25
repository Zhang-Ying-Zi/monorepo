interface IStrategy {
  operate(): void;
}

class BackDoor implements IStrategy {
  operate(): void {
    console.log("** back door **");
  }
}

class GivenGreenLight implements IStrategy {
  operate(): void {
    console.log("** give green light **");
  }
}

class BlockEnemy implements IStrategy {
  operate(): void {
    console.log("** block enemy **");
  }
}

class Context {
  private strategy: IStrategy;
  constructor(strategy: IStrategy) {
    this.strategy = strategy;
  }
  operate() {
    this.strategy.operate();
  }
}

// let ctx: Context = new Context(new BackDoor());
// ctx.operate();
// ctx = new Context(new GivenGreenLight());
// ctx.operate();
// ctx = new Context(new BlockEnemy());
// ctx.operate();
