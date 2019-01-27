import React from 'react';
import Logo from '../../Logo/Logo';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../IU/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';


const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Closed];
    if (props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} closed={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                <Logo />
                </div>

                <nav>
                    <NavigationItems />    
                </nav>
            </div>
        </Auxiliary>
    );
}

export default sideDrawer;