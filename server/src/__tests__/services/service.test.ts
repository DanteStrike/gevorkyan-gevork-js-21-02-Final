import axios, {AxiosResponse} from 'axios';
import {Response} from 'express';
import MockAdapter from 'axios-mock-adapter';
import Service from '../../services/service';
import {IServerErrorRes, IServerRes} from '../../types/request';

class MockClass extends Service {
  static mockMethod(
    res: Response,
    request: Promise<AxiosResponse<string>>,
    onSuccess?: (response: IServerRes<any>) => void,
    mapper?: ((response: AxiosResponse<string>) => IServerRes<string>) | null,
    onError?: (error: IServerErrorRes) => void
  ) {
    return MockClass.createCommonServerResponse(res, request, onSuccess, mapper, onError);
  }
}

const mockAxiosRes = new MockAdapter(axios);
mockAxiosRes.onGet(`goodResp`).reply(200, `goodResp`);
mockAxiosRes.onGet(`badResp`).reply(500, `badResp`);
mockAxiosRes.onGet(`errorResp`).reply(400, {error: 'error'});
mockAxiosRes.onGet(`timeout`).timeout();

describe(`class Service should work correctly`, () => {
  let respMock: Response;

  beforeEach(() => {
    respMock = {
      status: jest.fn(() => respMock),
      json: jest.fn(),
    } as unknown as Response;
  });

  it(`createCommonServerResponse success res test`, () => {
    const goodRequestMock = axios.get(`goodResp`);
    const successHandlerMock = jest.fn(() => {});
    const errorHandlerMock = jest.fn(() => {});

    MockClass.mockMethod(respMock, goodRequestMock, successHandlerMock, null, errorHandlerMock).then(() => {
      expect(successHandlerMock).toHaveBeenCalledTimes(1);
      expect(respMock.status).toHaveBeenLastCalledWith(200);
      expect(respMock.json).toHaveBeenLastCalledWith('goodResp');
    });
  });

  it(`createCommonServerResponse mapper test`, () => {
    const goodRequestMock = axios.get(`goodResp`);
    const mapperHandlerMock = jest.fn(() => ({status: 220, data: `normalized`}));

    MockClass.mockMethod(respMock, goodRequestMock, undefined, mapperHandlerMock, undefined).then(() => {
      expect(mapperHandlerMock).toHaveBeenCalledTimes(1);
      expect(respMock.status).toHaveBeenLastCalledWith(220);
      expect(respMock.json).toHaveBeenLastCalledWith('normalized');
    });
  });

  it(`createCommonServerResponse bad res test`, () => {
    const badRequestMock = axios.get(`badResp`);
    const errorHandlerMock = jest.fn(() => {});

    MockClass.mockMethod(respMock, badRequestMock, undefined, null, errorHandlerMock).then(() => {
      expect(errorHandlerMock).toHaveBeenCalledTimes(1);
      expect(respMock.status).toHaveBeenLastCalledWith(500);
      expect(respMock.json).toHaveBeenLastCalledWith({error: 'Internal server error'});
    });
  });

  it(`createCommonServerResponse timeout res test`, () => {
    const timeoutRequestMock = axios.get(`timeout`);

    MockClass.mockMethod(respMock, timeoutRequestMock, undefined, null, undefined).then(() => {
      expect(respMock.status).toHaveBeenLastCalledWith(500);
      expect(respMock.json).toHaveBeenLastCalledWith({error: 'Third party timeout error'});
    });
  });

  it(`createCommonServerResponse error res test`, () => {
    const errorRequestMock = axios.get(`errorResp`);

    MockClass.mockMethod(respMock, errorRequestMock, undefined, null, undefined).then(() => {
      expect(respMock.status).toHaveBeenLastCalledWith(400);
      expect(respMock.json).toHaveBeenLastCalledWith({error: 'error'});
    });
  });
});
