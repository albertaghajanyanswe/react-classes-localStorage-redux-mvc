import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {AuthAction} from '../../mRedux/actions/AuthAction';

/* SignIn VIEW */

class SingInView extends Component {
  constructor(props) {
    super(props);
    this.navigateToHome = this.navigateToHome.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
  }

  navigateToHome() {
    const { history } = this.props;
    history.push({
        pathname: '/home',
        state: {url: ''}
    });
  };

  onFinish(values) {
    const {users} = this.props;
    const existingUser = users.find(user => user.email === values.email && user.password === values.password);
    if (existingUser) {
      this.props.addCurrentUsers(existingUser);
      this.navigateToHome();
      toast.success("Successfuly logged in.")
    } else {
      toast.error("Yor email or password is incorrect.")
    }
  };

  onFinishFailed() {
    toast.error("Yor email or password is incorrect.")
  };

  render() {
    return (
      <div className='login-container'>
      <div className='login-content'>
        <Form
          name='normal_login'
          className='login-form'
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          wrapperCol={{
            span: 18,
          }}
        >
          <Form.Item
            name='email'
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },{
                pattern: new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i),
                message: 'Please enter a valid email',
            }
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item
            name='password'
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
              {
                pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'),
                message: 'Please enter a valid password (1 uppercase, 1 number, 1 special character, min length 8)',
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Log in
            </Button>
            <a href='/registration'> or Register now!</a>
          </Form.Item>
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
    addCurrentUsers(user) {
      return dispatch(AuthAction.addCurrentUsers(user));
    }
  }
}

/* SignIn CONTROLLER */

const SignIn = withRouter(SingInView);
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
