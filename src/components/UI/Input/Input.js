import React from "react";
import classes from "./Input.module.css"
const Input = (props) => {

    let inputElement = null;
    let inputClass = [classes.InputElement]

    if(props.invalid && props.shouldValidate && props.touched){
        inputClass.push(classes.Invalid);
    }

    switch (props.elementType){
        case('input'):
            inputElement = <input className={inputClass.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value}/>
            break;
        case('textarea'):
            inputElement = <textarea className={inputClass.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value}/>
            break;

        case('select'):
            inputElement = <select className={inputClass.join(' ')}
                                   value={props.value}
                                   key={props.value}
                                   onChange={props.changed}
            >
                {props.elementConfig.options.map( option => (
                    <option key={option.value} value={option.value} >{option.displayValue}</option>
                ))}

            </select>
            break;

        default:
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;