export const ADMIN_AUTHORITY = '001001001';

const codeModules = {
  general: '001',
};

export const MODULES = {
  GENERAL: {
    CODE: codeModules.general,
    SUBS: {
      SEGURIDAD: `${codeModules.general}001`,
    },
  },
};
