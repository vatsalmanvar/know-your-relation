import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useNavigate } from 'react-router-dom';

let globalFamilyName="adani";

function Home() {
    const [family,setFamily]=useState({
        familyName:''
    })
    const navigate=useNavigate()
    let fieldName,fieldValue;
    let fn="ambani";
    const handleInputs=(e)=>{
        fieldName=e.target.name;
        fieldValue=e.target.value;
        globalFamilyName=e.target.value;
        setFamily({...family,[fieldName]:fieldValue})
    }
    const submit= async (e)=>{
        e.preventDefault()
        const familyName=family;
        console.log(family); 
        console.log('You are in submit function');
        axios.post('http://localhost:3000/viewFamilyTree',familyName).then(res=>{console.log(res);navigate('/viewFamilyTree')}).catch(err=>{console.log(err)})
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