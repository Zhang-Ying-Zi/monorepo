class Boy {
  private state = "";
  changeState() {
    this.state = "some state";
  }
  getState() {
    return this.state;
  }
  setState(state: string) {
    this.state = state;
  }
  createMemento() {
    return new Memento(this.state);
  }
  restoreMemento(memento: Memento) {
    this.setState(memento.getState());
  }
}

class Memento {
  private state = "";
  constructor(state: string) {
    this.state = state;
  }
  getState() {
    return this.state;
  }
  setState(state: string) {
    this.state = state;
  }
}

class CareTaker {
  private memento: Memento | null = null;
  getMemento() {
    return this.memento;
  }
  setMemento(memento: Memento) {
    this.memento = memento;
  }
}

const boy: Boy = new Boy();
const caretaker = new CareTaker();
boy.setState("good state");
console.log(boy.getState());
caretaker.setMemento(boy.createMemento());
boy.changeState();
console.log(boy.getState());
boy.restoreMemento(<Memento>caretaker.getMemento());
console.log(boy.getState());
