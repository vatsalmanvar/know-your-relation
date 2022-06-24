import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
function Home() {
    const [family,setFamily]=useState({
        familyName:''
    })
    let fieldName,fieldValue;
    const handleInputs=(e)=>{
        fieldName=e.target.name;
        fieldValue=e.target.value;
        setFamily({...family,[fieldName]:fieldValue})
    }
    const submit= async (e)=>{
        e.preventDefault()
        const {familyName}=family
        axios.post('/',{familyName}).then(res=>{console.log(res)}).catch(err=>{console.log(err)})
    }
  return (
    <>
    <div className="container my-5">
    <form>
  <div className="form-group">
    <label htmlFor="exampleInputFamilyName1">enter  family name</label>
    <input type="text"  name="familyName"  className="form-control" id="exampleInputEmail1" onChange={handleInputs} v aria-describedby="Help" placeholder="Enter family name"/>
  </div>
  <button type="submit" className="btn btn-primary mt-5" onSubmit={submit}>Submit</button>
</form>
    </div>
    </>
  )
}

export default Home