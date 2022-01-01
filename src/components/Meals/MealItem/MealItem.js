import { useContext } from 'react';
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = props => {
    const ctx = useContext(CartContext);
    const addItemToCartHandler = (amount) => {
        ctx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: amount  
        })
    }
    const price = `$${props.price.toFixed(2)}`
    return <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addItemToCartHandler }/>
        </div>
    </li>
}

export default MealItem;