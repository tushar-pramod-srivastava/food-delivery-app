import React from 'react';
import classes from './Header.module.css'
import mealImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';

const Header = props => { 
    return (
        <>
            <header className={classes.header}>
                <h1>Meals</h1>
                <HeaderCartButton onClick={props.onClick}/>
            </header>
            <div className={classes["main-image"]}>
                <img src={ mealImage } alt="A table full of delicious food!!"/>
            </div>
        </>
    )
}

export default Header;