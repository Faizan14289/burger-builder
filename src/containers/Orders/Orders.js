import React, {useEffect, useState} from "react";
import Order from "../../components/Order/Order";
import axios from "axios";
import withErrorhandler from "../../hoc/withErrorHandler/withErrorhandler";
const Orders = () => {

    const [orders, setOrder] = useState({
        orders: [],
        loading: false
    });
    useEffect( () => {
        axios.get('https://react-my-burger-208e5-default-rtdb.firebaseio.com//orders.json')
            .then(resp => {
                let fetchedOrders = [];
                for (let key in resp.data){
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    })
                }

                setOrder(prevState => {
                    return { ...prevState, loading: false,orders: fetchedOrders}
                });
            })
            .catch(error => {
                setOrder(prevState => {
                    return { ...prevState, loading: false }
                });
            })
    }, [])


    return(
        <div>
            {orders.orders.map( order => (
                <Order key={order.id} price={order.price}  ingredients={order.ingredients} />
            ))}
        </div>
    )
}

export default withErrorhandler(Orders,axios);