interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  address: string;
  isLocked: boolean;
  isDeleted: boolean;
}

export default class User implements IUser {
  public username: string;
  public firstName: string;
  public lastName: string;
  public mobileNumber: string;
  public address: string;
  public isLocked: boolean;
  public isDeleted: boolean;

  constructor() {
    this.username = '';
    this.firstName = '';
    this.lastName = '';
    this.mobileNumber = '';
    this.address = '';
    this.isLocked = false;
    this.isDeleted = false;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
