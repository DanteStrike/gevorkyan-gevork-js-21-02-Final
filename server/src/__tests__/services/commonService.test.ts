import {Response} from 'express';
import CommonService from '../../services/commonService';
import ErrorMessages from '../../constants/errorMessages';

describe(`class CommonService should work correctly`, () => {
  let respMock: Response;
  const reqMock: any = {
    originalUrl: `anyPath`,
  };
  const errMock: any = undefined;

  beforeEach(() => {
    respMock = {
      status: jest.fn(() => respMock),
      json: jest.fn(),
    } as unknown as Response;
  });

  it(`getAppPathNotFoundError test`, () => {
    CommonService.getAppPathNotFoundError(reqMock, respMock);
    expect(respMock.status).toHaveBeenLastCalledWith(404);
    expect(respMock.json).toHaveBeenLastCalledWith({error: ErrorMessages.PATH_NOT_FOUND});
  });

  it(`getUnexpectedServerError test`, () => {
    CommonService.getUnexpectedServerError(errMock, reqMock, respMock, jest.fn);
    expect(respMock.status).toHaveBeenLastCalledWith(500);
    expect(respMock.json).toHaveBeenLastCalledWith({error: ErrorMessages.INTERNAL_SERVER_ERROR});
  });
});
