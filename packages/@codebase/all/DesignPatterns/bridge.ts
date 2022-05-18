abstract class Product {
  public abstract beProducted(): void;
  public abstract beSelled(): void;
}

class House extends Product {
  public beProducted(): void {
    console.log("** House beProducted **");
  }
  public beSelled(): void {
    console.log("** House beSelled **");
  }
}

class IPod extends Product {
  public beProducted(): void {
    console.log("** IPod beProducted **");
  }
  public beSelled(): void {
    console.log("** IPod beSelled **");
  }
}

abstract class Corp {
  private product: Product;
  constructor(product: Product) {
    this.product = product;
  }
  public makeMoney(): void {
    this.product.beProducted();
    this.product.beSelled();
  }
}

class HouseCorp extends Corp {
  constructor(house: House) {
    super(house);
  }
  public makeMoney(): void {
    super.makeMoney();
    console.log("** HouseCorp MakeMoney **");
  }
}

class ShanzhaiCorp extends Corp {
  constructor(product: Product) {
    super(product);
  }
  public makeMoney(): void {
    super.makeMoney();
    console.log("** ShanzhaiCorp MakeMoney **");
  }
}

const houseCorp = new HouseCorp(new House());
houseCorp.makeMoney();
const shanzhaiCorp = new ShanzhaiCorp(new IPod());
shanzhaiCorp.makeMoney();

////////////////////////
interface Engine {
  start(): void;
}

class HybridEngine implements Engine {
  start(): void {
    console.log("Start Hybrid Engine...");
  }
}

// 抽象类
abstract class Car {
  protected engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  public abstract drive(): void;
}

// 修正抽象类
abstract class RefinedCar extends Car {
  constructor(engine: Engine) {
    super(engine);
  }

  public drive(): void {
    this.engine.start();
    console.log("Drive " + this.getBrand() + " car...");
  }

  public abstract getBrand(): string;
}

class BossCar extends RefinedCar {
  constructor(engine: Engine) {
    super(engine);
  }

  public getBrand(): string {
    return "Boss";
  }
}

const car: RefinedCar = new BossCar(new HybridEngine());
car.drive();
