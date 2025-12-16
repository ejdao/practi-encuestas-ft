export class UserDataFromToken {
  constructor(
    private _id: string,
    private _document: string,
    private _fullName: string,
  ) {}

  get id(): string {
    return this._id;
  }

  get document(): string {
    return this._document;
  }

  get fullName(): string {
    return this._fullName;
  }
}

export class TokCreAndExpInfo {
  constructor(
    private _createdAt: Date,
    private _expiredAt: Date,
  ) {}

  get createdAt(): Date {
    return this._createdAt;
  }

  get expiredAt(): Date {
    return this._expiredAt;
  }
}

export class TokenDecoded {
  constructor(
    private _user: UserDataFromToken,
    private _passWasResetted: boolean,
    private _createdAt: Date,
    private _expiredAt: Date,
  ) {}

  get user(): UserDataFromToken {
    return this._user;
  }

  get passWasResetted(): boolean {
    return this._passWasResetted;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get expiredAt(): Date {
    return this._expiredAt;
  }
}
