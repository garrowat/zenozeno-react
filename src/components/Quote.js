import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const QuoteContents = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  flex: 0 0 15px;
  margin-right: 10px;
  margin-left: 5px;
  cursor: pointer;
`;

const Heart = styled.svg`
  height: 20px;
  width: 20px;

  & .path {
    fill: ${({ inFavorites }) => inFavorites ? '#ff7744' : '#ebebe6'};

    &:hover {
      fill: #a8a8a3;
    };
  };
`;

const SVGPath = styled.path`

`;

export default ({  fontSize, isLoading, children, favorites, addToFavorites }) => {
  const inFavorites = favorites && [...children][0] in favorites;
  return (
    <QuoteContents isLoading={isLoading} fontSize={fontSize}>
      <span>{children}</span>
      <FavoriteButton onClick={() => addToFavorites([...children][0])}>
        <Heart viewBox="0 0 32 29.6" inFavorites={inFavorites}>
          <path className="path" d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
          c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" />
        </Heart>
      </FavoriteButton>
    </QuoteContents>
  );
};