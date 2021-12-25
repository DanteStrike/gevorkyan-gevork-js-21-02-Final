import {RequestUtils} from '../../utils';
import sleep from '../mocks/utils';

describe(`RequestUtils should work correctly`, () => {
  it(`dummyRequest test`, () => {
    const onSuccess = jest.fn();
    RequestUtils.dummyRequest({});
    RequestUtils.dummyRequest({onSuccess});

    return sleep().then(() => {
      expect(onSuccess).toBeCalled();
      expect(onSuccess).toBeCalledWith(`ok`);
    });
  });
});
