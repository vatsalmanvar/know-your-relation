import React, { useContext, useEffect, useState ,Commponent} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useNavigate } from 'react-router-dom';
import ViewTree from './ViewTree';
import TestViewTree from './TestViewTree';
import treeContext from '../context/treeContext';

let globalFamilyName;

function Home() {
    const a = useContext(treeContext);
    //console.log(a.family);
    const [family,setFamily]=useState({
        familyName:''
    })
   
    const navigate=useNavigate()
    let fieldName,fieldValue;
    const handleInputs=(e)=>{
        fieldName=e.target.name;
        fieldValue=e.target.value;
        // globalFamilyName=e.target.value;
        setFamily({...family,[fieldName]:fieldValue})
    }
    const submit= async (e)=>{
      
        e.preventDefault()
        const familyName=family;
        console.log(family); 
        console.log('You are in submit function');
        console.log('requesting to backend')
        axios.post('http://localhost:5000/viewFamilyTree',familyName)
        .then((res)=>{
          const response=res.data;
          console.log("response from backend:",response);
            setFamily({...family,[fieldName]:response})
            console.log("family found",family);
            globalFamilyName=response;
            console.log("globalFamilyName: in home",globalFamilyName);
            // const view=<ViewTree family={response}
            // call back function to pass family name to view tree
            a.familyName = globalFamilyName.familyName;
            a.familyNodes = globalFamilyName.globalNodes;
            a.familyEdges = globalFamilyName.globalEdges;
            console.log("Below details is from context API");
            console.log("Family Name", a.familyName);
            console.log("Family Nodes", a.familyNodes);
            console.log("Family Edges", a.familyEdges);
            navigate('/TestViewTree',{state:{globalFamilyName:response}})
          })
          .catch(err=>{console.log(err)})
    }
  return (
    <>
    <div className="container my-5">
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputFamilyName1">enter  family name</label>
        <input type="text"  name="familyName"  className="form-control" id="exampleInputEmail1" onChange={handleInputs} aria-describedby="Help" placeholder="Enter family name"/>
      </div>
      <button type="submit" className="btn btn-primary mt-5" onClick={submit}>View</button>
      </form>
    </div>
    
    
    </>
  )
}

export default Home;
export {globalFamilyName};