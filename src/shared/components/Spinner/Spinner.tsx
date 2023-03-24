import React from 'react';

import './Spinner.scss';

export interface ISpinnerProps {
  size?: number;
}

export default function Spinner({ size = 40 }: ISpinnerProps): JSX.Element {
  const totalSizeInPx = `${size}px`;
  const circleSizeInPx = `${size * 0.8}px`;
  const circleMarginBorderInPx = `${size * 0.1}px`;

  const rootStyle = {
    width: totalSizeInPx,
    height: totalSizeInPx
  };

  const innerStyle = {
    width: circleSizeInPx,
    height: circleSizeInPx,
    margin: circleMarginBorderInPx,
    borderWidth: circleMarginBorderInPx
  };

  return (
    <div className="spinner" style={rootStyle}>
      <div style={innerStyle}></div>
      <div style={innerStyle}></div>
      <div style={innerStyle}></div>
      <div style={innerStyle}></div>
    </div>
  );
}