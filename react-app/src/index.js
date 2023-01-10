import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from "./context/Modal";
import SocketProvider from './context/SocketContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <ModalProvider>
         <App />
        </ModalProvider>
      </SocketProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
