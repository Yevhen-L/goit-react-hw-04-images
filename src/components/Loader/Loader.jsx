import React from 'react';

import { StyledLoader } from './Loader.styled';
import { RotatingLines } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <StyledLoader>
      <RotatingLines
        strokeColor="#3f51b5"
        strokeWidth="5"
        animationDuration="0.75"
        width="54"
        visible={true}
      />
    </StyledLoader>
  );
};
