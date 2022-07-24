import React from "react";
import TreeContext from "./treeContext";
import { useState } from "react";

const TreeState = (props)=>{
   
    return(
        <TreeContext.Provider value={{}}>
            {props.children}
        </TreeContext.Provider>
    )
}

export default TreeState;