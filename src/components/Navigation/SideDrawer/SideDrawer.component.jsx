import React from 'react';
import Logo from '../../Logo/Logo.Component';
import NavigationItems from '../NavigationItems/NavigationItems.component';
import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Auxiliary/Aux.component';
import Backdrop from '../../UI/Backdrop/Backdrop.component';
const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <div>
                    <nav>
                        <NavigationItems isAuthenticated={props.isAuth} />
                    </nav>
                </div>
            </div>
        </Aux>
    );
};

export default sideDrawer;