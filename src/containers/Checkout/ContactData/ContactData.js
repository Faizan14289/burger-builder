import React, {useState} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css"
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios";
import withErrorhandler from "../../../hoc/withErrorHandler/withErrorhandler";
import {useNavigate} from "react-router";
import Input from "../../../components/UI/Input/Input"
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
const ContactData  = (props) => {

    const [contactData, setContactData] = useState({
        orderForm: {
                name:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: '',
                    validation:{
                        required: true,
                        minLength:5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Germany'
                    },
                    value: '',
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveredMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options:[{
                            value:'fastest', displayValue: "Fastest"
                        }]
                    },
                    validation:{},
                    value: '',
                    valid: true
                }
        },
       name: '',
       email: '',
       address: {
           street: '',
           postalCode: ''
       },
        formIsValid: false
    });
    let navigate = useNavigate();

    const orderHandler = (event) => {
        event.preventDefault();
        // setContactData(prevState => {
        //     return { ...prevState, loading: true}
        // });

        const formData = {};

        for(let identifier in contactData.orderForm){
            formData[identifier] = contactData.orderForm[identifier].value;
        }
        const order = {
            ingredients: props.ing,
            price: props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order);
    }
    const formElementsArray = [];

    for(let key in contactData.orderForm){

        formElementsArray.push({
            id: key,
            config:contactData.orderForm[key]
        })
    }

    let checkValidity = (value,rules) => {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length >= rules.maxLength && isValid;
        }

        return isValid;
    }
    let inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value, inputIdentifier)
        const updatedOrderForm = {
            ...contactData.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formISValid = true;

        for (let inputIdentifier in updatedOrderForm ){
            formISValid = updatedOrderForm[inputIdentifier].valid && formISValid;
        }
        setContactData(prevState => {
            return { ...prevState, orderForm: updatedOrderForm, formIsValid: formISValid }
        });

    }

    let form = (<form onSubmit={orderHandler}>
            {
                formElementsArray.map( formEle => (

                    <Input key={formEle.id}
                           elementType={formEle.config.elementType}
                           elementConfig={formEle.config.elementConfig}
                           changed={(event) => inputChangedHandler(event, formEle.id)}
                           invalid={!formEle.config.valid}
                           shouldValidate={formEle.config.validation ? true : false}
                           touched={formEle.config.touched}
                            />
                ))
            }
                    <Button btnType={"Success"} disabled={!contactData.formIsValid}>Order</Button>
                </form>
    );

    if(props.loading){
        form = <Spinner />
    }


    return(
        <div className={classes.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return{
        ing: state.ingredients,
        price: state.totalPrice,
        loading: state.loading
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(ContactData,axios));