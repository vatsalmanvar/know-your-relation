import React from "react";
import TreeContext from "./treeContext";
import { useState } from "react";

const TreeState = (props)=>{
    let familyNodes = []
    let familyEdges = []
    let familyName = "-"
    let email = "-"
    let password = "-"
    let familyList = []
    const [temp, setTemp] = useState('intitial');
    function updateTemp(update){
        setTemp(update);
    }
    return(
        <TreeContext.Provider value={{familyName, familyNodes, familyEdges, email, password, familyList, temp, updateTemp}}>
            {props.children}
        </TreeContext.Provider>
    )
}

export default TreeState;