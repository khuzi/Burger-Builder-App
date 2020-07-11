import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo.Component';
import NavigationItems from '../NavigationItems/NavigationItems.component';
import Drawer from '../SideDrawer/DrawerToggle/DrawerToggle.component';
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Drawer clicked={props.clicked} />
        <Logo height="80%" />
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;