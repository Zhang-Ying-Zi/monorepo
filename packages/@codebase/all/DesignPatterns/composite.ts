interface ICorp {
  getInfo(): string;
}

type ILeaf = ICorp;

interface IBranch extends ICorp {
  addSubordinate(corp: ICorp): void;
  getSubordinateInfo(): ICorp[];
}

class Leaf implements ILeaf {
  private name = "";
  private position = "";
  private salary = 0;
  constructor(name: string, position: string, salary: number) {
    this.name = name;
    this.position = position;
    this.salary = salary;
  }
  getInfo(): string {
    return `${this.name} (${this.position}): ${this.salary}`;
  }
}

class Branch extends Leaf implements IBranch {
  private subordinateList: ICorp[] = [];
  addSubordinate(corp: ICorp): void {
    this.subordinateList.push(corp);
  }
  getSubordinateInfo(): ICorp[] {
    return this.subordinateList;
  }
}

function compositeCorpTree() {
  const root: IBranch = new Branch("David", "ceo", 100000);
  const developDep: IBranch = new Branch("Sam", "develop manager", 10000);
  const salesDep: IBranch = new Branch("Ryan", "sale manager", 10000);
  const a: ILeaf = new Leaf("a", "developer", 2000);
  const b: ILeaf = new Leaf("b", "developer", 2000);
  const c: ILeaf = new Leaf("c", "developer", 2000);
  root.addSubordinate(developDep);
  root.addSubordinate(salesDep);
  developDep.addSubordinate(a);
  developDep.addSubordinate(b);
  developDep.addSubordinate(c);
  return root;
}

function getTreeInfo(root: IBranch) {
  const subordinateList: ICorp[] = root.getSubordinateInfo();
  let info = "";
  subordinateList.forEach((icop) => {
    if (icop instanceof Branch) {
      info += icop.getInfo() + "\r\n" + getTreeInfo(icop);
    } else {
      info += icop.getInfo() + "\r\n";
    }
  });
  return info;
}

const ceo: IBranch = compositeCorpTree();
console.log(ceo.getInfo());
console.log(getTreeInfo(ceo));
