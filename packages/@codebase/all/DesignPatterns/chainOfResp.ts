interface IWomen {
  getType(): number;
  getRequest(): string;
}

class Women implements IWomen {
  type = 0; // 0 1 2 3
  request = "";

  constructor(type: number, request: string) {
    this.type = type;
    this.request = request;
  }

  getType() {
    return this.type;
  }

  getRequest() {
    return this.request;
  }
}

abstract class Handler {
  static FATHER_LEVEL_REQUEST = 1;
  static HUSBAND_LEVEL_REQUEST = 2;
  static SON_LEVEL_REQUEST = 3;

  private level = 0;

  private nextHandler: Handler | undefined;

  constructor(level: number) {
    this.level = level;
  }

  handleMessage(women: IWomen) {
    if (women.getType() == this.level) {
      this.response(women);
    } else {
      if (this.nextHandler != undefined) {
        this.nextHandler.handleMessage(women);
      } else {
        console.log("No handle for default : refuse");
      }
    }
  }

  setNext(handler: Handler) {
    this.nextHandler = handler;
  }

  abstract response(women: IWomen): void;
}

class Father extends Handler {
  constructor() {
    super(Handler.FATHER_LEVEL_REQUEST);
  }
  response(women: IWomen): void {
    console.log("request from daughter : " + women.getRequest());
    console.log("Father : confirm");
  }
}

class Husband extends Handler {
  constructor() {
    super(Handler.HUSBAND_LEVEL_REQUEST);
  }
  response(women: IWomen): void {
    console.log("request from wife : " + women.getRequest());
    console.log("Husband : confirm");
  }
}

class Son extends Handler {
  constructor() {
    super(Handler.SON_LEVEL_REQUEST);
  }
  response(women: IWomen): void {
    console.log("request from mother : " + women.getRequest());
    console.log("Son : confirm");
  }
}

const womenList: IWomen[] = [];
for (let i = 0; i < 5; i++) {
  womenList.push(
    new Women(Math.floor(Math.random() * 3) + 1, "sample request")
  );
}
const father: Father = new Father();
const husband: Husband = new Husband();
const son: Son = new Son();
father.setNext(husband);
husband.setNext(son);
womenList.forEach((women) => father.handleMessage(women));
