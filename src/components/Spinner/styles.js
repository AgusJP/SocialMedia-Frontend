import styled from 'styled-components';

export const Container = styled.div`
  width: 40px;
  height: 40px;
  margin: 10px auto;
  background-color: #333;
  border-radius: 100%;
  animation: rotation 1s infinite ease-in-out;

  @keyframes rotation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

`