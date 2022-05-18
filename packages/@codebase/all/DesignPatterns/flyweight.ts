class SignInfo {
  private id = "";
  private location = "";
  private subject = "";
  private postAddress = "";
  public setId(id: string) {
    this.id = id;
  }
  public getId(): string {
    return this.id;
  }
  public setLocation(location: string) {
    this.location = location;
  }
  public getLocation(): string {
    return this.location;
  }
  public setSubject(subject: string) {
    this.subject = subject;
  }
  public getSubject(): string {
    return this.subject;
  }
  public setPostAddress(postAddress: string) {
    this.postAddress = postAddress;
  }
  public getPostAddress(): string {
    return this.postAddress;
  }
}

class SignInfo4Pool extends SignInfo {
  private key: string;
  constructor(key: string) {
    super();
    this.key = key;
  }
  public getKey(): string {
    return this.key;
  }
  public setKey(key: string) {
    this.key = key;
  }
}

class SignInfoFactory {
  private static pool: Map<string, SignInfo> = new Map<string, SignInfo>();
  public static signInfo(): SignInfo {
    return new SignInfo();
  }
  public static getSignInfo(key: string): SignInfo {
    let result: SignInfo | null = null;
    if (!this.pool.has(key)) {
      console.log("** 建立对象，并放入池中 **");
      result = new SignInfo4Pool(key);
      this.pool.set(key, result);
    } else {
      result = this.pool.get(key) as SignInfo;
      console.log("** 从池中获取对象 **");
    }
    return result;
  }
}

for (let i = 0; i < 10; i++) {
  const key = "id-" + String(i % 3);
  SignInfoFactory.getSignInfo(key);
}
const signInfo = SignInfoFactory.getSignInfo("id-0");
console.log(signInfo);
