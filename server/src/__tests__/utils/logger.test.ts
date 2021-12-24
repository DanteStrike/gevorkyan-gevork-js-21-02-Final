import context from 'request-context';
import * as loggerModule from '../../utils/logger';
import logger from '../../utils/logger';
import {LoggerMessages} from '../../constants/loggerMessages';

context.get = jest.fn(() => `fake-id`);

describe(`Logger should work correctly`, () => {
  it(`collectLogMessage test`, () => {
    const mockMessage = `This is from test case json = {}, num = {}, string = {}` as LoggerMessages.Service;
    const mockArgs = [[1, 2], 10, `10`];
    const expectedResult = `|ID: fake-id| This is from test case json = [1,2], num = 10, string = 10`;

    expect(loggerModule.collectLogMessage(mockMessage, ...mockArgs)).toBe(expectedResult);
  });

  it(`logger.info | logger.error | logger.fatal test`, () => {
    const collectLogMessageSpy = jest.spyOn(loggerModule, 'collectLogMessage');

    logger.info(`logger-info test` as LoggerMessages.Service, 1, 2);
    expect(collectLogMessageSpy).lastCalledWith(`logger-info test`, 1, 2);

    logger.error(`logger-error test` as LoggerMessages.Service, 3, 4);
    expect(collectLogMessageSpy).lastCalledWith(`logger-error test`, 3, 4);

    logger.fatal(`logger-fatal test` as LoggerMessages.Service, 5, 6);
    expect(collectLogMessageSpy).lastCalledWith(`logger-fatal test`, 5, 6);
  });
});
