import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem.jsx';

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Home</NavigationItem>
            <NavigationItem link="/">Product</NavigationItem>
            <NavigationItem link="/">Search</NavigationItem>
            <NavigationItem link="/">Cart</NavigationItem>
        </ul>
    )
}

export default NavigationItems;