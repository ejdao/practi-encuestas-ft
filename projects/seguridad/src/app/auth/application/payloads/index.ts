import { CtmTypeI } from '@common/models';

export interface LoginPayload {
  context: CtmTypeI<string>;
  username: string;
  password: string;
  rememberMe: boolean;
}
