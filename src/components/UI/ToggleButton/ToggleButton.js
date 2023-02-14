import React from "react";
import classes from "./ToggleButton.module.css"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import fontawesome from '@fortawesome/fontawesome';
// import {  faBell } from '@fortawesome/fontawesome-free-regular'
// fontawesome.library.add(faBell);
const ToggleButton = (props) => {
    return (
        <div className={classes.Toggle} onClick={props.clicked}>
            {/*<a className={"btn"}>*/}
            {/*    <FontAwesomeIcon icon={faBell} />  </a>*/}
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default ToggleButton;