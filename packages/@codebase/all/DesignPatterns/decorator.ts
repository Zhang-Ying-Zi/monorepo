abstract class SchoolReport {
  abstract report(): void;
  abstract sign(name: string): void;
}

abstract class Decorator extends SchoolReport {
  private sr;
  constructor(sr: SchoolReport) {
    super();
    this.sr = sr;
  }
  report() {
    this.sr.report();
  }
  sign(name: string) {
    this.sr.sign(name);
  }
}

class HighScoreDecorator extends Decorator {
  private reportHighScore() {
    console.log("** decorator something **");
  }
  report() {
    this.reportHighScore();
    super.report();
  }
}

class SortDecorator extends Decorator {
  private sortScore() {
    console.log("** decorator another **");
  }
  report() {
    super.report();
    this.sortScore();
  }
}

class FouthGradeSchoolReport extends SchoolReport {
  report(): void {
    console.log("** reporting **");
  }
  sign(name: string): void {
    console.log(`** ${name} signing **`);
  }
}

let sr: SchoolReport = new FouthGradeSchoolReport();
sr = new HighScoreDecorator(sr);
sr = new SortDecorator(sr);
sr.report();
sr.sign("David");
