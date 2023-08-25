import React from 'react';
import {Spin} from 'antd';
import PropTypes from 'prop-types';

function MSpinner({isLoading, children, className, size}) {
  return (
    <Spin className={className} size={size} spinning={isLoading} >
      {children}
    </Spin>
  );
}

export {MSpinner};

MSpinner.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.element,
  className: PropTypes.string,
  size: PropTypes.string
};