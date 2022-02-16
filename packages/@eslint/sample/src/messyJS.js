// 需要报 for-direction Linter error
for (let i = 0; i < 10; i++) {
  console.log(i);
}

// 需要报 max-len Linter error
const longFunction = () => {
  console.log(1);
};
longFunction(1, 2, 3, 4, 5);

// 需要格式化的代码
let x = 1;
const hi = 2;
const aa = 3333333333333333;
let y = {
  name: "Jack",
  age: 11,
};

console.log("result", x, y);

console.log(hi, aa);
