import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems.jsx';

const Toolbar = (props) =>{
    return(
        <header className={classes.Toolbar}>
            <nav>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar;