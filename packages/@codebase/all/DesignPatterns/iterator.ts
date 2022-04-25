interface IProjectIterator {
  hasNext(): boolean;
  next(): IProject;
}

class ProjectIterator implements IProjectIterator {
  private projectList: IProject[] = [];
  private currentItem = 0;
  constructor(projectList: IProject[]) {
    this.projectList = projectList;
  }
  hasNext(): boolean {
    let b = true;
    if (
      this.currentItem >= this.projectList.length ||
      this.projectList[this.currentItem] == null
    ) {
      b = false;
    }
    return b;
  }
  next(): IProject {
    return this.projectList[this.currentItem++];
  }
}

interface IProject {
  getProjectInfo(): string;
}

interface IProjectList {
  add(name: string, num: number, cost: number): void;
  iterator(): IProjectIterator;
}

class Project implements IProject {
  private name = "";
  private num = 0;
  private cost = 0;
  constructor(name: string, num: number, cost: number) {
    this.name = name;
    this.num = num;
    this.cost = cost;
  }
  getProjectInfo(): string {
    return `${this.name} : ${this.num} , $${this.cost}`;
  }
}

class ProjectList implements IProjectList {
  private projectList: IProject[] = [];
  add(name: string, num: number, cost: number): void {
    this.projectList.push(new Project(name, num, cost));
  }
  iterator() {
    return new ProjectIterator(this.projectList);
  }
}

const projectList: IProjectList = new ProjectList();
projectList.add("sample1", 10, 10000);
projectList.add("sample2", 20, 20000);
projectList.add("sample3", 30, 30000);
const projectIterator: IProjectIterator = projectList.iterator();
while (projectIterator.hasNext()) {
  console.log(projectIterator.next().getProjectInfo());
}
