import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';

const QuoteContents = styled.span`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
  font-family: 'Roboto Mono', monospace;
  font-size: ${ ({ fontSize }) => fontSize ? `calc(${fontSize} + 1vmin)` : 'calc(12px + 1vmin)'};
  opacity:${ ({ isLoading, isMain }) => isMain && isLoading ? '0' : '1' };
  transition: all 0.2s ease-in-out;

  &:not(:last-child) {
    border-bottom: 1px solid #ebebe6;
  };
`;

const QuoteText = styled.span``;

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
    fill: ${({ inFavorites }) => inFavorites ? '#f4af13' : '#c9c9c9'};

    &:hover {
      fill: ${({ inFavorites }) => inFavorites ? '#a15a00' : '#a8a8a3'};
    };
  };
`;

const Push = styled.div`
  margin-left: auto;
  margin-right: 5px;
`;

const CopyButton = styled.span`
  font-weight: bold;
  color: #c9c9c9;
  cursor: pointer;

  &:hover {
    color: #a8a8a3;
  };
`;

export default ({
  fontSize,
  isLoading,
  isMain,
  children,
  favorites,
  addToFavorites,
  handleCopied,
}) => {
  const inFavorites = favorites && [...children][0] in favorites;
  return (
    <QuoteContents isLoading={isLoading} fontSize={fontSize} isMain={isMain}>
      <QuoteText>
        {children}
      </QuoteText>

      <Push />

      <CopyToClipboard text={children[0]} onCopy={handleCopied}>
        <CopyButton>
          &#10697;
        </CopyButton>
      </CopyToClipboard>

      <FavoriteButton onClick={() => addToFavorites([...children][0], favorites)}>
        <Heart viewBox="0 0 32 29.6" inFavorites={inFavorites}>
          <path className="path" d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
          c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" />
        </Heart>
      </FavoriteButton>
    </QuoteContents>
  );
};
