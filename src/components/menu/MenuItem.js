import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

function MenuItem(props) {
  const {key, icon, href, name} = props;

  return (
    <Menu.Item className='ant-menu-item' key={key} icon={icon} {...props}>
      <Link to={href}>{name}</Link>
    </Menu.Item>
  )
};

export {MenuItem};