import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl.component';
const controls = [
    {label: 'Salad' , type: 'salad'},
    {label: 'Cheese' , type: 'cheese'},
    {label: 'Sauce' , type: 'sauce'},
    {label: 'Meat' , type: 'meat'},
]
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={props.ingredientAdded.bind(this,ctrl.type)}
            removed={()=>props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button 
        className={classes.OrderButton} 
        disabled={!props.purchaseable}
        onClick={props.ordered}
        >{props.isAuth ? 'ORDER NOW' : 'SIGN UP'}</button>
    </div>
);

export default buildControls;       