const dummyRequest = ({onSuccess}: {onSuccess?: Function}) => {
  setTimeout(() => {
    if (onSuccess) {
      onSuccess('ok');
    }
  }, 0);
};

export default {
  dummyRequest,
};
