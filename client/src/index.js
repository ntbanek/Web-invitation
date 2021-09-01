import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider } from '@material-ui/styled-engine';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <StylesProvider injectFirst>
        <App />
    </StylesProvider> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
