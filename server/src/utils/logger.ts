import context from 'request-context';
import {createRollingFileLogger} from 'simple-node-logger';
import format from 'string-format';
import {LoggerMessagesType} from '../constants/loggerMessages';
import loggerConfig from '../configs/loggerConfig';

const logger = createRollingFileLogger(loggerConfig.options);

type LoggerArgsType = Array<{[k: string]: any} | string | number>;
type FormatArgsType = Array<{[k: string]: any} | string>;

const normalizeArgsForFormat = (...args: LoggerArgsType): FormatArgsType =>
  args.map((arg) => {
    if (typeof arg === `object` || !arg) {
      return JSON.stringify(arg);
    }

    return arg.toString();
  });

export const collectLogMessage = (message: LoggerMessagesType, ...args: LoggerArgsType): string =>
  `|ID: ${context.get(loggerConfig.contextName)}| ${format(message, ...normalizeArgsForFormat(...args))}`;

export default {
  ...logger,
  info: (message: LoggerMessagesType, ...args: LoggerArgsType) => logger.info(collectLogMessage(message, ...args)),
  error: (message: LoggerMessagesType, ...args: LoggerArgsType) => logger.error(collectLogMessage(message, ...args)),
  fatal: (message: LoggerMessagesType, ...args: LoggerArgsType) => logger.fatal(collectLogMessage(message, ...args)),
};
