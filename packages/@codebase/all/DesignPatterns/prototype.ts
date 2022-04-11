interface Prototype {
  clone(): Prototype;
}

export class Sheep implements Prototype {
  name: string;
  tags: number[];

  constructor(name: string, tags: number[]) {
    this.name = name;
    this.tags = tags;
  }

  clone() {
    return new Sheep(this.name, this.tags);
  }
}

const sheep = new Sheep("dolly", [1, 2, 3]);
const dolly = sheep.clone();
console.log(dolly.name === sheep.name); // true
console.log(dolly.tags === sheep.tags); // true
sheep.tags.push(4);
console.log(dolly.tags); // [1, 2, 3, 4]
sheep.tags = [];
console.log(dolly.tags); // [1, 2, 3, 4]
console.log(dolly instanceof Sheep); // true
console.log(dolly === sheep); // false
