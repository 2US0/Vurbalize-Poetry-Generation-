import React from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  to {
    opacity: 0.1;
    transform: translateY(-16px);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Dot = styled.div`
  width: 16px;
  height: 16px;
  margin: 3px 6px;
  border-radius: 50%;
  background-color: #4046f7;
  opacity: 1;
  animation: ${bounce} 0.6s infinite alternate;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const BouncingDotsLoader = () => {
  return (
    <LoaderContainer className="bouncing-loader">
      <Dot></Dot>
      <Dot></Dot>
      <Dot></Dot>
    </LoaderContainer>
  );
};

export default BouncingDotsLoader;