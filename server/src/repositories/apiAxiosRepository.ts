import {AxiosError, AxiosResponse} from 'axios';

class ApiAxiosRepository {
  protected static createCommonAxiosRequest<T>(
    request: Promise<AxiosResponse<T>>,
    onSuccess?: (response: AxiosResponse<T>) => void,
    onError?: (error: AxiosError | Error) => void
  ): Promise<AxiosResponse<T>> {
    return request
      .then((response) => {
        if (onSuccess !== undefined) {
          onSuccess(response);
        }

        return response;
      })
      .catch((error: AxiosError | Error) => {
        if (onError !== undefined) {
          onError(error);
        }

        return Promise.reject(error);
      });
  }
}

export default ApiAxiosRepository;
