interface IVisitor {
  visitCommonEmployee(commonEmployee: CommonEmployee): void;
  visitManager(manager: Manager): void;
}

class Visitor implements IVisitor {
  visitCommonEmployee(commonEmployee: CommonEmployee): void {
    console.log(this.getCommonEmployeeInfo(commonEmployee));
  }
  visitManager(manager: Manager): void {
    console.log(this.getManagerInfo(manager));
  }
  getBasicInfo(employee: Employee) {
    return `${employee.getName()} - ${employee.getSex()} - ${employee.getSalary()}`;
  }
  getCommonEmployeeInfo(commonEmployee: CommonEmployee) {
    return this.getBasicInfo(commonEmployee) + ` - ${commonEmployee.getJob()}`;
  }
  getManagerInfo(manager: Manager) {
    return this.getBasicInfo(manager) + ` - ${manager.getPerformance()}`;
  }
}

abstract class Employee {
  static MALE = 0;
  static FEMALE = 1;
  private name = "";
  private salary = 0;
  private sex = Employee.MALE;
  getName(): string {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
  getSalary(): number {
    return this.salary;
  }
  setSalary(salary: number) {
    this.salary = salary;
  }
  getSex(): number {
    return this.sex;
  }
  setSex(sex: number) {
    this.sex = sex;
  }
  abstract accept(visitor: IVisitor): void;
}

class CommonEmployee extends Employee {
  private job = "";
  getJob() {
    return this.job;
  }
  setJob(job: string) {
    this.job = job;
  }
  accept(visitor: IVisitor): void {
    return visitor.visitCommonEmployee(this);
  }
}

class Manager extends Employee {
  private performance = "";
  getPerformance() {
    return this.performance;
  }
  setPerformance(performance: string) {
    this.performance = performance;
  }
  accept(visitor: IVisitor): void {
    return visitor.visitManager(this);
  }
}

const zhangsan = new CommonEmployee();
zhangsan.setJob("working");
zhangsan.setName("zhangsan");
zhangsan.setSalary(1800);
zhangsan.setSex(Employee.MALE);

const lisi = new CommonEmployee();
lisi.setJob("working");
lisi.setName("lisi");
lisi.setSalary(1700);
lisi.setSex(Employee.FEMALE);

const wangwu = new Manager();
wangwu.setPerformance("watching");
wangwu.setName("lisi");
wangwu.setSalary(2500);
wangwu.setSex(Employee.FEMALE);

const employees = [];
employees.push(zhangsan);
employees.push(lisi);
employees.push(wangwu);
const visitor = new Visitor();
employees.forEach((employee) => employee.accept(visitor));
