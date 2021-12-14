import React from 'react'
import { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from "styled-components";
import { RoutesApp } from './routes/index.js';
import Providers from './context/index.js';
import './App.css';

const Background = styled(BaseModalBackground)`
  opacity: ${props => props.opacity};
  transition: opacity ease 200ms;
`;

export const App = () => {
  return (
    <Providers>   
      <ModalProvider backgroundComponent={Background}>
        <RoutesApp/>
      </ModalProvider>        
    </Providers>
  )
}

