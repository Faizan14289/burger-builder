import React, {useEffect, useState} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route, Routes, useNavigate} from "react-router";
import WithRouter from "../../hoc/WithRouter/WithRouter";
import {Redirect, useSearchParams} from "react-router-dom";
import {connect} from "react-redux";
import ContactData from "./ContactData/ContactData";
import * as actionTypes from "../../store/actions/actionTypes";
const  Checkout = (props) => {

    // const [ingredients,setIngredients] = useState({
    //     ingredients : {
    //         salad : 0,
    //         cheese : 0,
    //         meat : 1,
    //         bacon : 0
    //     },
    //     price: 0
    // });
    // let [searchParams, setSearchParams] = useSearchParams();
    // useEffect(() => {
    //         const ingre = {};
    //         let price = 0;
    //
    //         searchParams.forEach((element,index) => {
    //
    //             if(index == "price")
    //             {
    //                 price = element;
    //             }
    //             else{
    //                 ingre[index] = element;
    //             }
    //
    //         });
    //         setIngredients(prevState => {
    //             return {...prevState, ingredients: ingre,price: price}
    //         });
    //
    // },[]);
    let navigate = useNavigate();
    let checkoutContinuedHandler =() => {
        navigate('/checkout/checkout-data', { replace: true })
    }

    let checkoutCancelledHandler = () =>{
        navigate(-1);
    }

    let summary = navigate('/');

    if(props.ing){
        summary =  <CheckoutSummary
            checkoutCancelled={checkoutCancelledHandler}
            checkoutContinued={checkoutContinuedHandler}
            ingredients={props.ing} />
    }

    return(

        <div>
            {summary}
            <Routes>
                {/*//<Route path={"/checkout-data"} element={<ContactData ingredients={props.ing} price={props.ing}  />} />*/}
                <Route path={"/checkout-data"} element={<ContactData />} />
            </Routes>
        </div>
    );
}

const mapStateToProps = state => {
    return{
        ing: state.ingredients
    }
}


export default connect(mapStateToProps)(WithRouter(Checkout));