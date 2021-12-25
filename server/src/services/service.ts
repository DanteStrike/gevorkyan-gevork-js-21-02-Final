import axios, {AxiosError, AxiosResponse} from 'axios';
import {Response} from 'express';
import {IServerErrorRes, IServerRes} from '../types/request';
import ErrorMessages from '../constants/errorMessages';
import {logger} from '../utils';
import {LoggerMessages} from '../constants/loggerMessages';

class Service {
  protected static createCommonServerResponse<T>(
    res: Response,
    request: Promise<AxiosResponse<T>>,
    onSuccess?: (response: IServerRes<T>) => void,
    mapper?: ((response: AxiosResponse<T>) => IServerRes<T>) | null,
    onError?: (error: IServerErrorRes) => void
  ) {
    return request
      .then((response) => {
        const successServerRes: IServerRes<T> =
          mapper === undefined || mapper === null ? {status: response.status, data: response.data} : mapper(response);

        if (onSuccess !== undefined) {
          onSuccess(successServerRes);
        }

        res.status(successServerRes.status).json(successServerRes.data);
      })
      .catch((error: AxiosError | Error) => {
        logger.error(LoggerMessages.Service.ERROR, error);

        const errServerRes: IServerErrorRes = {
          status: 500,
          data: {error: ErrorMessages.INTERNAL_SERVER_ERROR},
        };

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;

          if (axiosError.code !== undefined) {
            errServerRes.status = 500;
            errServerRes.data = {
              error:
                axiosError.code === 'ECONNABORTED'
                  ? ErrorMessages.THIRD_PARTY_TIMEOUT_ERROR
                  : ErrorMessages.INTERNAL_SERVER_ERROR,
            };
          } else {
            errServerRes.status = axiosError.response?.status || 500;
            errServerRes.data = {error: axiosError.response?.data?.error || ErrorMessages.INTERNAL_SERVER_ERROR};
          }
        }

        if (onError !== undefined) {
          onError(errServerRes);
        }

        res.status(errServerRes.status).json(errServerRes.data);
      });
  }
}

export default Service;
