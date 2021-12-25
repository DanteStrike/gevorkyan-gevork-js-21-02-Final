import React from 'react';
import './SubmitButton.scss';
import {Button as ButtonANDT} from 'antd';

interface ISubmitButtonProps {
  loading?: boolean;
  children?: React.ReactNode;
}

function SubmitButton({children, loading}: ISubmitButtonProps) {
  return (
    <ButtonANDT loading={loading} className="button" type="primary" htmlType="submit" block>
      {children}
    </ButtonANDT>
  );
}

SubmitButton.defaultProps = {
  children: ``,
  loading: false,
};

export default React.memo(SubmitButton);
