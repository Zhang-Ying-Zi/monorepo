interface IUserinfo {
  getUserName(): string;
  getHomeAddress(): string;
  getMobileNumber(): string;
  getOfficeTelNumber(): string;
  getJobPosition(): string;
  getHomeTelNumber(): string;
}

export class UserInfo implements IUserinfo {
  getUserName(): string {
    console.log("** getUserName **");
    return "getUserName";
  }
  getHomeAddress(): string {
    console.log("** getHomeAddress **");
    return "getHomeAddress";
  }
  getMobileNumber(): string {
    console.log("** getMobileNumber **");
    return "getMobileNumber";
  }
  getOfficeTelNumber(): string {
    console.log("** getOfficeTelNumber **");
    return "getOfficeTelNumber";
  }
  getJobPosition(): string {
    console.log("** getJobPosition **");
    return "getJobPosition";
  }
  getHomeTelNumber(): string {
    console.log("** getHomeTelNumber **");
    return "getHomeTelNumber";
  }
}

interface IOuterUser {
  getUserBaseInfo(): object;
  getUserOfficeInfo(): object;
  getUserHomeInfo(): object;
}

class OuterUser implements IOuterUser {
  getUserBaseInfo(): object {
    console.log("** getUserBaseInfo **");
    return {};
  }
  getUserOfficeInfo(): object {
    console.log("** getUserOfficeInfo **");
    return {};
  }
  getUserHomeInfo(): object {
    console.log("** getUserHomeInfo **");
    return {};
  }
}

export class OuterUserInfo extends OuterUser implements IUserinfo {
  private baseInfo;
  private officeInfo;
  private homeInfo;
  constructor() {
    super();
    this.baseInfo = this.getUserBaseInfo();
    this.officeInfo = this.getUserOfficeInfo();
    this.homeInfo = this.getUserHomeInfo();
  }
  getUserName(): string {
    // this.baseInfo.get("getUserName");
    console.log("** getUserName **");
    return "getUserName";
  }
  getHomeAddress(): string {
    // this.homeInfo.get("getHomeAddress");
    console.log("** getHomeAddress **");
    return "getHomeAddress";
  }
  getMobileNumber(): string {
    // this.baseInfo.get("getMobileNumber");
    console.log("** getMobileNumber **");
    return "getMobileNumber";
  }
  getOfficeTelNumber(): string {
    // this.officeInfo.get("getOfficeTelNumber");
    console.log("** getOfficeTelNumber **");
    return "getOfficeTelNumber";
  }
  getJobPosition(): string {
    // this.officeInfo.get("getJobPosition");
    console.log("** getJobPosition **");
    return "getJobPosition";
  }
  getHomeTelNumber(): string {
    // this.homeInfo.get("getHomeTelNumber");
    console.log("** getHomeTelNumber **");
    return "getHomeTelNumber";
  }
}
