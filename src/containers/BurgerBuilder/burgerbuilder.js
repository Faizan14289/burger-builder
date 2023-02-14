import React, {useEffect, useState} from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorhandler from "../../hoc/withErrorHandler/withErrorhandler";
// import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import {useNavigate} from "react-router";
import {createSearchParams} from "react-router-dom";
import * as burgerBuilderActions from "../../store/actions/index";

import * as actionTypes from "../../store/actions/actionTypes"
import {connect} from "react-redux";
const BurgerBuilder =(props) => {

    // const INGREDIENTS_PRICES = {
    //     salad : 0.5,
    //     cheese : 0.4,
    //     meat : 1.3,
    //     bacon : 0.7
    // }

    let navigate = useNavigate();
    const [burgerbuilder,setburgerbuilder] = useState({
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    });
    useEffect(() => {
        props.onInitIngredient();
    },[])

    let purchaseCelling = () => {
        setburgerbuilder(prevState => {
            return { ...prevState, purchasing: false }
        });
    }

    // const queryParams = [];
    //
    // for(let i in burgerbuilder.ingredients){
    //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(burgerbuilder.ingredients[i]));
    // }
    // let queryString = queryParams.join('&');
    // queryString += '&price='+ burgerbuilder.totalPrice;
    let purchaseContinueHandler = () => {

        navigate({
            pathname: "/checkout"
        });
    }

     let  updatePurchaseAble = (ingredients) =>  {

        let sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey];
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
         return sum > 0 ? true : false;


    }

    // const addIngredient = (type) => {
    //
    //     const OldCount = burgerbuilder.ingredients[type];
    //     const updatedCount  =  OldCount + 1;
    //
    //     const updatedIngredientObject  = {
    //         ...burgerbuilder.ingredients
    //     }
    //
    //     updatedIngredientObject[type] = updatedCount;
    //     const priceAddition = INGREDIENTS_PRICES[type];
    //     const oldPrice = burgerbuilder.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //
    //     //Update state object values
    //     setburgerbuilder({
    //        totalPrice: newPrice,
    //        ingredients: updatedIngredientObject
    //     });
    //
    //
    //     updatePurchaseAble(updatedIngredientObject);
    //
    // }
    // const removeIngredient = (type) => {
    //     const OldCount = burgerbuilder.ingredients[type];
    //     if(OldCount <= 0){
    //         return;
    //     }
    //     const updatedCount  =  OldCount - 1;
    //
    //     const updatedIngredientObject  = {
    //         ...burgerbuilder.ingredients
    //     }
    //     updatedIngredientObject[type] = updatedCount;
    //     const priceDeduction = INGREDIENTS_PRICES[type];
    //     const oldPrice = burgerbuilder.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //
    //     //Update state object values
    //     setburgerbuilder({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredientObject
    //     });
    //     updatePurchaseAble(updatedIngredientObject);
    // }

    let purchaseHandler = () => {
        setburgerbuilder(prevState => {
            return { ...prevState, purchasing: true }
        });
    }

    let disabledInfo = {
        ...props.ing
    }

    for (let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = <Spinner />;
     // if(burgerbuilder.ingredients){
     if(props.ing){
         burger = (
             <Aux>
                 <Burger ingredients = {props.ing}/>
                 <BuildControls
                     ingredientAdded={props.onIngredientAdded}
                     ingredientRemoved={props.onIngredientRemoved}
                     disabled={disabledInfo}
                     purchaseable={updatePurchaseAble(props.ing)}
                     price={props.price}
                     ordered={purchaseHandler}
                 />
             </Aux>
         );

         orderSummary = <OrderSummary ingredients={props.ing}
                       purchaseCancel={purchaseCelling}
                       price={props.price}
                       purchaseContinue={purchaseContinueHandler} />;
     }

    // if(burgerbuilder.loading){
    //     orderSummary = <Spinner />;
    // }

    return (
            <Aux>

                <Modal show={burgerbuilder.purchasing} modalClosed={purchaseCelling}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
    );
}

const mapStateToProps = state => {
    return{
        ing: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredients(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredients(ingName)),
        onInitIngredient: () => dispatch(burgerBuilderActions.initIngredients()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorhandler(BurgerBuilder, axios));