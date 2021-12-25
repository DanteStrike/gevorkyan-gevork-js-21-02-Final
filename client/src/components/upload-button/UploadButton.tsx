import React from 'react';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';

interface IUploadButtonProps {
  loading: boolean;
}
const style = {marginTop: 8};

function UploadButton({loading}: IUploadButtonProps) {
  return (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={style}>Upload</div>
    </div>
  );
}

export default React.memo(UploadButton);
