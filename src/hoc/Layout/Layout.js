import React, {useCallback, useState} from "react";
import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
const Layout = (props) => {

    const [sideDrawer,sideDrawerState] = useState({
        showSideDrawer: false
    });

    const sideDrawerCloseHandler = useCallback(() => {
        sideDrawerState(prevState => {
            return { ...prevState, showSideDrawer: false }
        });
    }, []);

    let drawerToggleClicked = useCallback(() => {
        sideDrawerState(prevState => {
            return { ...prevState, showSideDrawer: !prevState.showSideDrawer }
        });
    }, []);

    return (
        <Aux>
            <Toolbar drawerToggleClicked={drawerToggleClicked} />
            <SideDrawer open={sideDrawer.showSideDrawer} closed={sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}


export default Layout;