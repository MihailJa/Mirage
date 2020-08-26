import React from 'react'
import logo from '../assets/images/dzone.svg'
import s from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {Layout, Button} from 'antd'


type HeaderType = {
    isAuth: boolean
    login: string | null
    logout: ()=> void
}


const Header: React.FC<HeaderType>  = (props) => {

    return (
        <header className={s.header}>
            <Layout.Header>

            <NavLink to='/profile' activeClassName="navbar-brand">
                <img src={logo} width="50" height="50"
                     className="logo" alt="logo" loading="lazy"/>
                     Mirage
            </NavLink>


    <div className={s.loginBlock}>
        {props.isAuth ? <div> <span className={s.login}>{props.login}</span>
                <Button onClick={props.logout}>Log out</Button>
            </div>
            : <NavLink to={'/login'}>Login</NavLink>}

    </div>
            </Layout.Header>
        </header>

    )
}

export default Header