import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { useRef, useState } from 'react';

const MealItemForm = props => {
    const inputRef = useRef();
    const [isAmountValid, setIsAmountValid] = useState(true);

    const submitHandler = event => {
        event.preventDefault();
        const enteredValue = inputRef.current.value;
        const enteredValueNumber = +enteredValue;

        if (enteredValue.trim().length === 0 || enteredValueNumber < 1 || enteredValueNumber > 5) {
            setIsAmountValid(false);
            return;
        }
        props.onAddToCart(enteredValueNumber)
    }


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Amount" ref={inputRef} input={{
                id: "amount"  + props.id,
                type: "number",
                min: 1,
                max: 5,
                step: 1,
                defaultValue: 1
            }} />
            <button>+ Add</button>
            {!isAmountValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    )
        
}

export default MealItemForm;