import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount : 0
}

const CartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price
        const existingItemInCartIndex = state.items.findIndex(item => item.id === action.item.id)
        const existingItem = state.items[existingItemInCartIndex];
        let updatedItems;
        if (existingItem) {
            const updatedItem = {...existingItem, amount: existingItem.amount + action.item.amount}
            updatedItems = [...state.items]
            updatedItems[existingItemInCartIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === 'REMOVE') {
        const existingItemInCartIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingItemInCartIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item=> item.id !== action.id)
        } else {
            updatedItems = [ ...state.items];
            updatedItems[existingItemInCartIndex] = { ...existingItem, amount: existingItem.amount - 1 };
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
}

const CartProvider = props => {
    const [cardState, dispatchCartAction] = useReducer(CartReducer, defaultCartState);
    const addItemToCarthandler = item => {
        dispatchCartAction({
            type: "ADD",
            item: item
        })
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({
            type: "REMOVE",
            id:id
        })
    }
    const cartContext = {
        items: cardState.items,
        totalAmount: cardState.totalAmount,
        addItem: addItemToCarthandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider;