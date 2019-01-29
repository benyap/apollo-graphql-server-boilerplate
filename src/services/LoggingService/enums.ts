// prettier-ignore
export enum LogLevel {
  SILLY  = 'silly',
  DEBUG  = 'debug',
  INFO   = 'info',
  WARN   = 'warn',
  ERROR  = 'error',
  FATAL  = 'fatal',
}

// prettier-ignore
export enum LogTopic {
  SERVER          = 'main',
  ENVIRONMENT     = 'env',
  SERVICE         = 'srvc',
  NETWORK         = 'net',
  AUTHENTICATION  = 'auth',
  CONTEXTCREATOR  = 'ctxc',
  GRAPHQLCOST     = 'cost',
}
