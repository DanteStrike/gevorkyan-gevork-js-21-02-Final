import axios, {AxiosResponse} from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ApiAxiosRepository from '../../repositories/apiAxiosRepository';

class MockClass extends ApiAxiosRepository {
  static mockMethod(
    req: Promise<AxiosResponse<any>>,
    successHandlerMock = jest.fn(() => {}),
    errorHandlerMock = jest.fn(() => {})
  ) {
    return ApiAxiosRepository.createCommonAxiosRequest(req, successHandlerMock, errorHandlerMock);
  }
}

const mockAxiosRes = new MockAdapter(axios);
mockAxiosRes.onGet(`goodResp`).reply(200, {response: {data: `goodResp`}});
mockAxiosRes.onGet(`badResp`).reply(500, {response: {data: `badResp`}});

describe(`class ApiAxiosRepository should work correctly`, () => {
  it(`createCommonAxiosRequest test goodResp`, () => {
    const goodRequestMock = axios.get(`goodResp`);
    const successHandlerMock = jest.fn(() => {});
    const errorHandlerMock = jest.fn(() => {});

    MockClass.mockMethod(goodRequestMock, successHandlerMock, errorHandlerMock).then((response) => {
      expect(successHandlerMock).toBeCalledTimes(1);
      expect(successHandlerMock).toHaveBeenCalledWith(response);

      expect(errorHandlerMock).toBeCalledTimes(0);
    });
  });

  it(`createCommonAxiosRequest test goodResp`, () => {
    const goodRequestMock = axios.get(`badResp`);
    const successHandlerMock = jest.fn(() => {});
    const errorHandlerMock = jest.fn(() => {});

    MockClass.mockMethod(goodRequestMock, successHandlerMock, errorHandlerMock).catch((err) => {
      expect(errorHandlerMock).toBeCalledTimes(1);
      expect(errorHandlerMock).toHaveBeenCalledWith(err);

      expect(successHandlerMock).toBeCalledTimes(0);
    });
  });
});
