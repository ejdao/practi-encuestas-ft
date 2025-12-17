import { TokenDecodedI } from '@common/models';
import { jwtDecode } from 'jwt-decode';
import { STORAGE_KEYS } from '../constants';

export const PROTECTED_STORAGE_KEYS = [
  STORAGE_KEYS.theme,
  STORAGE_KEYS.sidebarIsCompact,
  STORAGE_KEYS.forceWebVersion,
  STORAGE_KEYS.forceMobileVersion,
];

interface AuthTokenI {
  id: string;
  rst: boolean;
  dcm: string;
  iat: number;
  exp: number;
}

const defaultToken = localStorage.getItem(STORAGE_KEYS.authToken)!;

const tokenDateToDate = (date: number): Date => {
  const _ = new Date(0);
  return new Date(_.setUTCSeconds(date));
};

export const decodeToken = (token: string = defaultToken): TokenDecodedI => {
  try {
    const tokDecoded: AuthTokenI = jwtDecode(token);

    const tkDcd: TokenDecodedI = {
      user: {
        id: tokDecoded.id,
        document: tokDecoded.dcm,
        fullName: 'UNKNOWN',
      },
      passWasResetted: tokDecoded.rst,
      createdAt: tokenDateToDate(tokDecoded.iat),
      expiredAt: tokenDateToDate(tokDecoded.exp),
    };

    return tkDcd;
  } catch (error) {
    throw new Error('Token not found or invalid');
  }
};

export const clearLocalStorage = (except: string[] = []) => {
  const toDelete: string[] = [];

  for (let i = 0, length = localStorage.length; i < length; i++) {
    const storageKey = localStorage.key(i) || '';

    if ([...PROTECTED_STORAGE_KEYS, ...except].indexOf(storageKey) < 0) toDelete.push(storageKey);
  }

  toDelete.forEach((td) => {
    localStorage.removeItem(td);
  });
};
