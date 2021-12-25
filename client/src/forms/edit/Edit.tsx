import React from 'react';
import {useHistory} from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import EditForm from '../../components/edit-form/EditForm';
import useAppSelector from '../../hooks/use-app-selector';
import {profileSelectors} from '../../store/profile';
import {authOperations, authSelectors} from '../../store/auth';
import useAppDispatch from '../../hooks/use-app-dispatch';
import {IUserUpdate} from '../../types';

function Edit() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(profileSelectors.getProfile);
  const isLoading = useAppSelector(authSelectors.getIsLoading);
  const isError = useAppSelector(authSelectors.getIsError);
  const errMsg = useAppSelector(authSelectors.getError);

  const history = useHistory();
  const handleModalClose = () => {
    const {pathname} = history.location;
    const newRout = pathname.substring(0, pathname.lastIndexOf('/'));
    history.push(newRout);
  };

  const handleUpdateUser = (data: IUserUpdate) => {
    dispatch(authOperations.update(data));
    handleModalClose();
  };

  return (
    <Modal isOpen onClose={handleModalClose} isError={isError} errMsg={errMsg}>
      <EditForm user={profile} loading={isLoading} onSubmit={handleUpdateUser} />
    </Modal>
  );
}

export default React.memo(Edit);
