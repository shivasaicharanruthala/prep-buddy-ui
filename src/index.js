import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import App from './App';                                 // imports App component.
import { UserProvider } from './Context/user.context';   // imports UserProvider to access user context.

// imports styles
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      // App component is wrapped with BrowserRouter to access routes & UserProvider to access user context.
      <BrowserRouter>
          <UserProvider>
              <App />
          </UserProvider>
      </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
