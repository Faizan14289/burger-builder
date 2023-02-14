import * as actionTypes from "./actionTypes";
import axios from "axios";
export const purchaseBurgerSuccess = (id, orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('https://react-my-burger-208e5-default-rtdb.firebaseio.com/orders.json',orderData)
            .then(resp => {
                dispatch(purchaseBurgerSuccess(resp.data, orderData ))
            })
            .catch(error => {

            });
    };
}

