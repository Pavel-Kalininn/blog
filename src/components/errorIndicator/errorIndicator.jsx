import React from 'react';
import { Alert } from 'antd';

export default function ErrorIndicator({ error }) {
  return (
    <div className="wrapper">
      <Alert message="Error" description={error} showIcon />
    </div>
  );
}
