import React from 'react';
import {Spin} from 'antd';
import './Loading.scss';

interface ILoadingProps {
  isLoading: boolean;
}

function Loading({isLoading}: ILoadingProps) {
  return (
    <>
      {isLoading && (
        <div className="loading">
          <Spin size="large" />
        </div>
      )}
    </>
  );
}

export default React.memo(Loading);
