abstract class Command {
  protected rg: RequirementGroup = new RequirementGroup();
  protected pg: PageGroup = new PageGroup();
  protected cg: CodeGroup = new CodeGroup();
  abstract execute(): void;
}

class AddRequirementCommand extends Command {
  execute(): void {
    this.rg.find();
    this.rg.add();
    this.rg.plan();
  }
}
class DeletePageCommand extends Command {
  execute(): void {
    this.pg.find();
    this.pg.delete();
    this.pg.plan();
  }
}

class Invoker {
  private command: Command | null;
  constructor() {
    this.command = null;
  }
  setCommand(command: Command) {
    this.command = command;
  }
  action() {
    this.command?.execute();
  }
}

abstract class Group {
  abstract find(): void;
  abstract add(): void;
  abstract delete(): void;
  abstract change(): void;
  abstract plan(): void;
}

class RequirementGroup extends Group {
  find() {
    console.log("** Requirement find **");
  }
  add() {
    console.log("** Requirement add **");
  }
  delete() {
    console.log("** Requirement delete **");
  }
  change() {
    console.log("** Requirement change **");
  }
  plan() {
    console.log("** Requirement plan **");
  }
}

class PageGroup extends Group {
  find() {
    console.log("** Page find **");
  }
  add() {
    console.log("** Page add **");
  }
  delete() {
    console.log("** Page delete **");
  }
  change() {
    console.log("** Page change **");
  }
  plan() {
    console.log("** Page plan **");
  }
}

class CodeGroup extends Group {
  find() {
    console.log("** Code find **");
  }
  add() {
    console.log("** Code add **");
  }
  delete() {
    console.log("** delete **");
  }
  change() {
    console.log("** Code change **");
  }
  plan() {
    console.log("** Code plan **");
  }
}

const invoker: Invoker = new Invoker();
invoker.setCommand(new AddRequirementCommand());
invoker.action();
invoker.setCommand(new DeletePageCommand());
invoker.action();
