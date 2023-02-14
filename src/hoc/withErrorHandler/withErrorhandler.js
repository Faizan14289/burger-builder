import React, {useEffect, useLayoutEffect, useState} from "react";
import Aux from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
const withErrorhandler = (WrappedComponent, axios) => {


    return (props) => {
        const [error,setError] = useState({
            error: null
        })
        var requestInterceptor = null;
        var responseInterceptor = null;
        useEffect(() => {
            requestInterceptor = axios.interceptors.request.use(req => {
                                    setError({error: null});
                                    return req;
                                  });
            responseInterceptor = axios.interceptors.response.use(resp => resp, error => {
                                    setError({error: error})
                                  });
        }, []);

        useEffect(() => {
            return () => {
                // Anything in here is fired on component unmount.
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            }
        },[]);

        const errorConfirmedHandler =  () => {
            setError({error: null})
        }

        return (
            <Aux>
                <Modal show={error.error} modalClosed={errorConfirmedHandler}>
                    {error.error ? error.error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}
export default withErrorhandler;