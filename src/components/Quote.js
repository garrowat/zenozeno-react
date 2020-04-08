import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const QuoteContents = styled.span`
  display: flex;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
  font-family: 'Roboto Mono', monospace;
  font-size: ${ ({ fontSize }) => fontSize ? `calc(${fontSize} + 1vmin)` : 'calc(12px + 1vmin)'};
  opacity:${ ({ isLoading }) => isLoading ? '0' : '1' };
  transition: all 0.2s ease-in-out;

  &:not(:last-child) {
    border-bottom: 1px solid #ebebe6;
  };
`;

const FavoriteButton = styled.div`
  flex: 0 0 30px;
  position: relative;

`;

const Heart = styled.div`
  position: relative;
  background-color: red;
  height: 30px;
  transform: rotate(-45deg);
  width: 30px;

  &:after {
    content: "";
    background-color: red;
    border-radius: 50%;
    height: 30px;
    position: absolute;
    width: 30px;
  };
`;

export default ({  fontSize, isLoading, children }) => {
  return (
    <QuoteContents isLoading={isLoading} fontSize={fontSize}>
      <span>{children}</span>
      <FavoriteButton>
        <Heart />
      </FavoriteButton>
    </QuoteContents>
  );
};