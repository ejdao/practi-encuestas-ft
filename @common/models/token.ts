export interface UserDataFromTokenI {
  id: string;
  document: string;
  fullName: string;
}

export interface TokCreAndExpInfoI {
  createdAt: Date;
  expiredAt: Date;
}

export interface TokenDecodedI {
  user: UserDataFromTokenI;
  passWasResetted: boolean;
  createdAt: Date;
  expiredAt: Date;
}
