import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import {Layout, Menu} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SettingOutlined,
  ClockCircleOutlined,
  CalendarOutlined } from '@ant-design/icons';
import { MenuItem } from '../components/menu/MenuItem';
import { AuthAction } from '../mRedux/actions/AuthAction';

const { Header, Sider, Content } = Layout;

class MLoggedInPageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    }
    this.collapseSideBar = this.collapseSideBar.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getMenuSelectedItem = this.getMenuSelectedItem.bind(this);
  }

  collapseSideBar() {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed
    }));
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    if(window.innerWidth < 1100){
      this.setState((prevState) => ({
        collapsed: !prevState.collapsed
      }));
    } else {
      this.setState({collapsed: this.state.collapsed});
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  logOut() {
    const {logOut, history} = this.props;
    logOut();
    history.push({
      pathname: '/login',
      state: {url: ''}
    });
  }

  getMenuSelectedItem() {
    const selectedItem = this.props.history.location.pathname === '/home' ? ['1'] :
    this.props.history.location.pathname === '/meeting' ? ['2'] :
    this.props.history.location.pathname === '/calendar' ? ['3'] :
    this.props.history.location.pathname === '/settings' ? ['4'] : ['1'];
    return selectedItem;
  }

  render() {
    this.getMenuSelectedItem();
    const {collapsed} = this.state;
    return (
      <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={this.getMenuSelectedItem()}>
          <MenuItem key={'1'} icon={<UserOutlined />} href={'/home'} name={'Home'}/>
          <MenuItem key={'2'} icon={<ClockCircleOutlined />} href={'/meeting'} name={'Meeting'}/>
          <MenuItem key={'3'} icon={<CalendarOutlined />} href={'/calendar'} name={'Calendar'}/>
          <MenuItem key={'4'} icon={<SettingOutlined />} href={'/settings'} name={'Settings'}/>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.collapseSideBar,
          })}
          <a onClick={this.logOut} style={{ marginRight: '20px' }} > Log Out </a>
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {this.props.content}
        </Content>
      </Layout>
    </Layout>
    );
  }
}

MLoggedInPageView.propTypes = {
  content : PropTypes.element
};

const mapStateToProps = (state) => {
  return {
    users: state.auth.users,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut() {
      return dispatch(AuthAction.logOut());
    }
  }
}

/* MLoggedInPage CONTROLLER */

const MLoggedInPage = withRouter(MLoggedInPageView);
export default connect(mapStateToProps, mapDispatchToProps)(MLoggedInPage);
