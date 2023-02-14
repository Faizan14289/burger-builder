import React, {useState} from "react";
import classes from "./Toolbar.module.css"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../../UI/ToggleButton/ToggleButton"

const Toolbar = (props) => (
        <header className={classes.Toolbar}>
            <ToggleButton clicked={props.drawerToggleClicked} />
            <div className={classes.Logo}>
                <Logo/>
            </div>

            <nav className={classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    )
export default Toolbar;