
import React, {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = props => {
    const ctx = useContext(CartContext);
    const { items } = ctx;
    const [isButtonIsHighlighted, setIsButonIsHighlighted] = useState(false);
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)

    const btnClasses = `${classes.button} ${isButtonIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setIsButonIsHighlighted(true);
        const timer = setTimeout(() => {
            setIsButonIsHighlighted(false)
        }, 300);
        return (() => {
            clearTimeout(timer);
        })
    }, [items])

    return <button className={btnClasses} onClick={props.onClick}>
     <span className={classes.icon}><CartIcon/></span>
     <span>Your Card</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
 </button>
}

export default HeaderCartButton;