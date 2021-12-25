import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import PostCard from '../../components/post-card/PostCard';
import useAppSelector from '../../hooks/use-app-selector';
import {postActions, postOperations, postSelectors} from '../../store/post';
import useAppDispatch from '../../hooks/use-app-dispatch';
import {RequestType} from '../../store/post/slices/fetch';
import {IComment} from '../../types';
import AppList, {AppListMod} from '../../components/app-list/AppList';
import Comment from '../../components/comment/Comment';

interface IPostProps {
  id: string;
}

function Post({id}: IPostProps) {
  const commentsPerPage = 2;

  const dispatch = useAppDispatch();
  const post = useAppSelector(postSelectors.getPost);
  const isPostLoading = useAppSelector(postSelectors.getPostIsLoading);
  const isPostError = useAppSelector(postSelectors.getPostIsError);
  const postError = useAppSelector(postSelectors.getPostError);

  const page = useAppSelector(postSelectors.getPage);
  const total = useAppSelector(postSelectors.getTotal);
  const comments = useAppSelector(postSelectors.getComments);
  const isCommentsLoading = useAppSelector(postSelectors.getCommentsIsLoading);
  const isCommentsError = useAppSelector(postSelectors.getCommentsIsError);
  const commentsError = useAppSelector(postSelectors.getCommentsError);

  const handlePaginationChange = (newPage: number) => {
    dispatch(postActions.changePage(newPage));
  };

  const history = useHistory();
  const handleModalClose = () => {
    const {pathname} = history.location;
    const newRout = pathname.substring(0, pathname.lastIndexOf('/'));
    history.push(newRout);
  };

  useEffect(() => {
    dispatch(postOperations.loadPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(postOperations.loadComments(id, commentsPerPage, page));
  }, [dispatch, id, page]);

  useEffect(
    () => () => {
      dispatch(postActions.fetchActions[RequestType.LOAD_POST].requestAbort());
      dispatch(postActions.fetchActions[RequestType.LOAD_COMMENTS].requestAbort());
      dispatch(postActions.reset());
      dispatch(postActions.resetList());
    },
    [dispatch]
  );

  const renderComments = () => (
    <AppList
      current={page}
      total={total}
      dataSource={comments}
      onChange={handlePaginationChange}
      isLoading={isCommentsLoading}
      pageSize={commentsPerPage}
      renderItem={(comment: IComment) => (
        <AppList.Item key={comment.id}>
          <Comment comment={comment} />
        </AppList.Item>
      )}
      mod={AppListMod.SMALL_ROW}
    />
  );

  return (
    <Modal
      isOpen
      onClose={handleModalClose}
      isError={isPostError || isCommentsError}
      errMsg={postError || commentsError}
    >
      <PostCard post={post} modal renderComments={renderComments} isLoading={isPostLoading} />
    </Modal>
  );
}

export default Post;
