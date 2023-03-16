import React from 'react';
import { Spin } from 'antd';

function LoadingIndicator({ tip }) {
  return <Spin tip={tip} size="large" />;
}

export default LoadingIndicator;
