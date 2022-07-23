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
    <div>
      <div className="container my-5">
        <div>
          <a href="/signin"><button className="btn btn-secondary float-end me-4" >Sign in</button></a>
          <a href="/register"><button className="btn btn-secondary float-end me-2">Register</button></a>
        </div>
        <span><h6>Welcome to</h6></span>
        <span className='my-5' style={{fontFamily : 'fantasy'}}><h1>Know Your Relation</h1></span>
      </div>
      </div>
      
      

     
    <section className="vh-100" style={{"backgroundColor": "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{"borderRadius": "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Enter Family Name and View Tree</p>

                <form className="mx-1 mx-md-4">


                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="exampleInputEmail1" name="familyName" className="form-control" placeholder='Enter Family Name' onChange={handleInputs}/>
                    </div>
                  </div> 

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg" onClick={submit}>View Tree</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://wallpaperaccess.com/full/320438.jpg"
                  className="img-fluid" alt="demo"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Home;
export {globalFamilyName};