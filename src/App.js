import React from "react";
import { connect } from "react-redux";
import { Spin } from 'antd';
import { BrowserRouter as Router, Route, withRouter, Switch } from 'react-router-dom';
import Layout from 'antd/lib/layout/layout';
import { ToastContainer } from 'react-toastify';
import { PrivateRoute } from "./routers/PrivateRoute";
import Settings from "./components/settings/Settings";
import Home from "./components/home/Home";
import SignIn from './components/signin/SingIn';
import SignUp from './components/signup/SingUp';
import Meeting from "./components/meeting/Meeting";

/* App VIEW */
class AppView extends React.Component {

  render() {
    return (
      <Spin wrapperClassName="spin-wrapper" spinning={false} size="large" >
      <Router>
          <Layout className="layout-container">
              <Switch>
                  <Route path="/login"><SignIn /> </Route>
                  <Route path="/registration"><SignUp /> </Route>
                  <PrivateRoute path="/settings" component={Settings} />
                  <PrivateRoute path="/meeting" component={Meeting} />
                  {/* <PrivateRoute path="/calendar" component={Calendar} /> */}
                  <PrivateRoute path="/" component={Home} />
              </Switch>
          </Layout>
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
    </Spin>
    );
  }
}

/* App CONTROLLER */

const App = withRouter(AppView);
export default App;
