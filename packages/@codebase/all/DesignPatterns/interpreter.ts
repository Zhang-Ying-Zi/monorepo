abstract class Expression {
  abstract interpreter(objs: Map<string, number>): number;
}

class VarExpression extends Expression {
  private key: string;
  constructor(key: string) {
    super();
    this.key = key;
  }
  interpreter(objs: Map<string, number>): number {
    return objs.get(this.key) as number;
  }
}

abstract class SymbolExpression extends Expression {
  protected left: Expression;
  protected right: Expression;
  constructor(left: Expression, right: Expression) {
    super();
    this.left = left;
    this.right = right;
  }
}

class AddExpression extends SymbolExpression {
  interpreter(objs: Map<string, number>): number {
    return this.left.interpreter(objs) + this.right.interpreter(objs);
  }
}

class SubExpression extends SymbolExpression {
  interpreter(objs: Map<string, number>): number {
    return this.left.interpreter(objs) - this.right.interpreter(objs);
  }
}

class Calculator {
  private expression: Expression;
  constructor(expStr: string) {
    const stack = new Array<Expression>();
    const charArray = expStr.split("");
    let left: Expression;
    let right: Expression;
    for (let i = 0; i < charArray.length; i++) {
      switch (charArray[i]) {
        case "+":
          left = stack.pop() as Expression;
          right = new VarExpression(charArray[++i]);
          stack.push(new AddExpression(left, right));
          break;
        case "-":
          left = stack.pop() as Expression;
          right = new VarExpression(charArray[++i]);
          stack.push(new SubExpression(left, right));
          break;
        default:
          stack.push(new VarExpression(charArray[i]));
      }
    }
    this.expression = stack.pop() as Expression;
  }
  run(objs: Map<string, number>): number {
    return this.expression.interpreter(objs);
  }
}

function getObjs(expStr: string, values: number[]): Map<string, number> {
  const map = new Map<string, number>();
  const charArray = expStr.split("");
  let index = 0;
  charArray.forEach((char) => {
    if (char != "+" && char != "-") {
      if (!map.has(char)) {
        map.set(char, values[index++]);
      }
    }
  });
  return map;
}

// 模拟输入
let expStr = "a+b+c";
let values = [1, 2, 3];
let cal = new Calculator(expStr);
console.log(cal.run(getObjs(expStr, values)));

expStr = "a+b-c";
values = [10, 2, 3];
cal = new Calculator(expStr);
console.log(cal.run(getObjs(expStr, values)));

expStr = "d+e+f-v";
values = [10, 10, 10, 1];
cal = new Calculator(expStr);
console.log(cal.run(getObjs(expStr, values)));
