/* eslint-disable */
import React from 'react';

const ShareBackgroundImageEN = (props) => {
  return (
    <image
      x="0"
      y="0"
      width={props.width}
      height={props.height}
    />
  );
};

ShareBackgroundImageEN.propTypes = {
  width: React.PropTypes.string,
  height: React.PropTypes.string,
};

export default ShareBackgroundImageEN;