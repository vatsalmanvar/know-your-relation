import React from "react";
import TreeContext from "./treeContext";
import { useState } from "react";

const TreeState = (props)=>{
    let familyNodes = []
    let familyEdges = []
    let familyName 
    // let [nodes] = useState([
    //     {id:'1', 
    //     type: 'textUpdater', 
    //     position: { x: 0, y: 0 }, 
    //     data: { value: 123, child:0 ,FN:"Gangdas", SN:"Vijya", male_female:true, relationFromPerson1:"-", relationFromPerson2:"-"}},
    //     {id:'1-1', 
    //     type: 'textUpdater', 
    //     position: { x: -250, y: 300 }, 
    //     data: { value: 123, child:0 ,FN:"Kishor", SN:"Anjana", male_female:true, relationFromPerson1:"-", relationFromPerson2:"-"}},
    //     {id:'1-2', 
    //     type: 'textUpdater', 
    //     position: { x: 0, y: 300 }, 
    //     data: { value: 123, child:0 ,FN:"Rekha", SN:"Dilip", male_female:false, relationFromPerson1:"-", relationFromPerson2:"-"}},
    //     {id:'1-3', 
    //     type: 'textUpdater', 
    //     position: { x: 250, y: 300 }, 
    //     data: { value: 123, child:0 ,FN:"Harshukh", SN:"Smita", male_female:true, relationFromPerson1:"-", relationFromPerson2:"-"}},
    //     {id:'1-1-1', 
    //     type: 'textUpdater', 
    //     position: { x: -250, y: 600 }, 
    //     data: { value: 123, child:0 ,FN:"Vatsal", SN:"", male_female:true, relationFromPerson1:"-", relationFromPerson2:"-"}},
    // ]);
    return(
        <TreeContext.Provider value={{familyName, familyNodes, familyEdges}}>
            {props.children}
        </TreeContext.Provider>
    )
}

export default TreeState;