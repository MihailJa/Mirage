import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {Layout, Menu} from "antd";
import {
    DesktopOutlined,    
    UserOutlined,
    FormOutlined,
    TeamOutlined,
    ReadOutlined
} from '@ant-design/icons';


const Navbar= () => {
    return (
        <Layout.Sider  className={s.navbar} width={200}>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <span className={s.item}>
                        <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
                    </span>
                </Menu.Item>
                <Menu.Item key="2" icon={<FormOutlined />}>
                    <span className={s.item}>
                        <NavLink to='/dialogs' activeClassName={s.active}>Message</NavLink>
                    </span>
                </Menu.Item>
                <Menu.Item key="3" icon={<TeamOutlined />}>
                    <span className={s.item}>
                        <NavLink to='/users' activeClassName={s.active}>Users</NavLink>
                    </span>
                </Menu.Item>
                <Menu.Item key="4" icon={<ReadOutlined />}>
                    <span className={s.item}>
                        <NavLink to='/m' activeClassName={s.active}>News</NavLink>
                    </span>
                </Menu.Item>
            </Menu>
            {/*
          <nav className={s.navbar}>
              <div className={s.item}>
               <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
              </div>
              <div className={s.item}>
                  <NavLink to='/dialogs' activeClassName={s.active}>Message</NavLink>
              </div>
              <div className={s.item}>
              <NavLink to='/users' activeClassName={s.active}>Users</NavLink>
              </div>
              <div className={s.item}>
                  <NavLink to='/m' activeClassName={s.active}>Main content</NavLink>
              </div>

          </nav> */}
            </Layout.Sider>

    )
}


export default  Navbar;