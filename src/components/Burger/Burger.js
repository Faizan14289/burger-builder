import React from "react";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients"
import classes from "./Burger.module.css"
import {element} from "prop-types";
import WithRouter from "../../hoc/WithRouter/WithRouter";
const burger = (props) =>{

    let transformedIngredients = Object.keys(props.ingredients)
        .map( igkey => {
        return[...Array(props.ingredients[igkey])].map((_, i) =>{
            return <BurgerIngredient key={igkey + i} type = {igkey} />;
        });
    }).reduce((array,element)  =>{
        return array.concat(element);
    }, []);

    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={"bread-top"}/>
            {transformedIngredients}
            <BurgerIngredient type={"bread-bottom"}/>
        </div>
    );
}

export default WithRouter(burger);