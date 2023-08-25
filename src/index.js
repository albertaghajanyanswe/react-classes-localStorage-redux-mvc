import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import App from './App';
import './index.scss';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route> <App /> </Route>
      </Switch>
    </Router>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
