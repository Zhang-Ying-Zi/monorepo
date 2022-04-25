abstract class LiftState {
  protected context: LiftContext;
  constructor(context: LiftContext) {
    this.context = context;
  }
  abstract open(): void;
  abstract close(): void;
  abstract run(): void;
  abstract stop(): void;
}

class OpeningState extends LiftState {
  open(): void {
    console.log("** open **");
  }
  close(): void {
    this.context.setLiftState(this.context.closingState);
    this.context.close();
  }
  run(): void {
    // do nothing
  }
  stop(): void {
    // do nothing
  }
}

class ClosingState extends LiftState {
  open(): void {
    this.context.setLiftState(this.context.openingState);
    this.context.open();
  }
  close(): void {
    console.log("** close **");
  }
  run(): void {
    this.context.setLiftState(this.context.runningState);
    this.context.run();
  }
  stop(): void {
    this.context.setLiftState(this.context.stopingState);
    this.context.stop();
  }
}

class RunningState extends LiftState {
  open(): void {
    // do nothing
  }
  close(): void {
    // do nothing
  }
  run(): void {
    console.log("** run **");
  }
  stop(): void {
    this.context.setLiftState(this.context.stopingState);
    this.context.stop();
  }
}

class StopingState extends LiftState {
  open(): void {
    this.context.setLiftState(this.context.openingState);
    this.context.open();
  }
  close(): void {
    // do nothing
  }
  run(): void {
    this.context.setLiftState(this.context.runningState);
    this.context.run();
  }
  stop(): void {
    console.log("** stop **");
  }
}

class LiftContext {
  openingState = new OpeningState(this);
  closingState = new ClosingState(this);
  runningState = new RunningState(this);
  stopingState = new StopingState(this);
  private liftState: LiftState = this.stopingState;
  setLiftState(liftState: LiftState) {
    this.liftState = liftState;
  }
  open(): void {
    this.liftState.open();
  }
  close(): void {
    this.liftState.close();
  }
  run(): void {
    this.liftState.run();
  }
  stop(): void {
    this.liftState.stop();
  }
}

const ctx = new LiftContext();
ctx.setLiftState(ctx.stopingState);
ctx.open();
ctx.close();
ctx.run();
ctx.stop();
