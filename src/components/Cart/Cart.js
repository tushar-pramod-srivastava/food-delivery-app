import { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = props => {
    const ctx = useContext(CartContext)
    const totalAmount = ctx.totalAmount.toFixed(2);
    const hasItems = ctx.items.length > 0;

    const cartItemAddHandler = (item) => {
        ctx.addItem({...item, amount:1})
    }

    const cartItemRemoveHandler = (id) => {
        ctx.removeItem(id);
    }
    const cartItems = <ul className={classes['cart-items']}>{
        
        ctx.items.map(item =>
            <CartItem key={item.id} {...item} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={ cartItemAddHandler.bind(null, item)}/>
        )
    }</ul>

    return (
        <Modal onClick={props.onClick}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClick}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;