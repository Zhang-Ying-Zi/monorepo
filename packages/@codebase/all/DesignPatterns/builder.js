class CarModel {
  constructor() {
    this.sequences = [];
  }
  start() {}
  stop() {}
  alarm() {}
  engineBoom() {}
  run() {
    for (let i = 0; i < this.sequences.length; i++) {
      let actionName = this.sequences[i];
      switch (actionName) {
        case "start":
          this.start();
          break;
        case "stop":
          this.stop();
          break;
        case "alarm":
          this.alarm();
          break;
        case "engineBoom":
          this.engineBoom();
          break;
      }
    }
  }
  setSequence(sequences) {
    this.sequences = sequences;
  }
}

class BenzModel extends CarModel {
  start() {
    console.log("Benz start");
  }
  stop() {
    console.log("Benz stop");
  }
  alarm() {
    console.log("Benz alaem");
  }
  engineBoom() {
    console.log("Benz engineBoom");
  }
}

class BMWModel extends CarModel {
  start() {
    console.log("BMW start");
  }
  stop() {
    console.log("BMW stop");
  }
  alarm() {
    console.log("BMW alaem");
  }
  engineBoom() {
    console.log("BMW engineBoom");
  }
}

class CarBuilder {
  // eslint-disable-next-line no-unused-vars
  setSequence(sequences) {}
  getCarModel() {}
}

class BenzBuilder extends CarBuilder {
  constructor() {
    super();
    this.benz = new BenzModel();
  }
  setSequence(sequences) {
    this.benz.setSequence(sequences);
  }
  getCarModel() {
    return this.benz;
  }
}

class BMWBuilder extends CarBuilder {
  constructor() {
    super();
    this.bmw = new BMWModel();
  }
  setSequence(sequences) {
    this.bmw.setSequence(sequences);
  }
  getCarModel() {
    return this.bmw;
  }
}

class Director {
  constructor() {
    this.sequences = [];
    this.benzBuilder = new BenzBuilder();
    this.bmwBuilder = new BMWBuilder();
  }

  getABenzModel() {
    this.sequences = [];
    this.sequences.push("start");
    this.sequences.push("stop");
    this.benzBuilder.setSequence(this.sequences);
    return this.benzBuilder.getCarModel();
  }

  getBBenzModel() {
    this.sequences = [];
    this.sequences.push("engineBoom");
    this.sequences.push("start");
    this.sequences.push("stop");
    this.benzBuilder.setSequence(this.sequences);
    return this.benzBuilder.getCarModel();
  }

  getCBMWModel() {
    this.sequences = [];
    this.sequences.push("alarm");
    this.sequences.push("start");
    this.sequences.push("stop");
    this.bmwBuilder.setSequence(this.sequences);
    return this.bmwBuilder.getCarModel();
  }

  getDBMWModel() {
    this.sequences = [];
    this.sequences.push("start");
    this.bmwBuilder.setSequence(this.sequences);
    return this.bmwBuilder.getCarModel();
  }
}

let director = new Director();
director.getABenzModel().run();
director.getBBenzModel().run();
director.getCBMWModel().run();
director.getDBMWModel().run();
