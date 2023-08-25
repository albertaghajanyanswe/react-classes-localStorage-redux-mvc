import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { AuthAction } from '../../mRedux/actions/AuthAction';

/* SignUp CONTROLLER */

class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.navigateToLogin = this.navigateToLogin.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  navigateToLogin() {
    const { history } = this.props;
    history.push({
        pathname: '/login',
        state: {url: ''}
    });
  };

  onFinish(values) {
    console.log('Received values of form: ', values);
    const {users} = this.props;
    const user = users.find(user => user.email === values.email);
    if (!user) {
      this.props.addUser(values);
      this.navigateToLogin();
    }
  };

  render() {
    return (
      <div className='register-container'>
        <div className='register-content'>
          <Form
            name='register'
            onFinish={this.onFinish}
            scrollToFirstError
          >
            <Form.Item
              name='firstname'
              label={<span>First Name</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input your First Name!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='lastname'
              label={<span>Last Name</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input your Last Name!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='email'
              label='E-mail'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'),
                  message: 'Please enter a valid password (1 uppercase, 1 number, 1 special character, min length 8)',
                }
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='confirm'
              label='Confirm Password'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div className='register-footer'>
              <Form.Item>
                <Button onClick={this.navigateToLogin}>
                  {'< Back To LogIn'}
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Register
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    users: state.auth.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser(user) {
      return dispatch(AuthAction.addUser(user));
    }
  }
}

const SignUp = withRouter(SignUpView);

/* SignUp CONTROLLER */
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
