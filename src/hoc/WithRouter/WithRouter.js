
import React from "react";
import {useLocation,useNavigate,useParams} from "react-router";
import {useSearchParams} from "react-router-dom";
const WithRouter = (Component) =>  {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        let searchParams = useSearchParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params, searchParams }}
            />
        );
    }

    return ComponentWithRouterProp;
}

export  default WithRouter;