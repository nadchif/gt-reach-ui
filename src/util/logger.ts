/* eslint-disable no-console */
import config from '../config';

const noop = (): void => {};

const prodModeLogger = {
  log: noop,
  info: noop,
  error: noop,
  warn: noop,
  debug: noop,
} as const;
const devModeLogger = {
  log: (...args: unknown[]): void => console.log(...args),
  info: (...args: unknown[]): void => console.info(...args),
  error: (...args: unknown[]): void => console.error(...args),
  warn: (...args: unknown[]): void => console.warn(...args),
  debug: (...args: unknown[]): void => console.debug(...args),
} as const;

const logger = config.isDevelopmentEnv ? devModeLogger : prodModeLogger;

export default logger;
