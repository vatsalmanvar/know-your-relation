import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios'
import treeContext from '../context/treeContext';


function SignIn() {
  const a = useContext(treeContext);

  const navigate=useNavigate();
    const [user,setUser]=useState();
    let fieldName,fieldValue;
    const handleInputs=(e)=>{
        fieldName=e.target.name;
        fieldValue=e.target.value;
        // globalFamilyName=e.target.value;
        setUser({...user,[fieldName]:fieldValue})
    }
    const submit= async (e)=>{
        e.preventDefault()
        const {email,password}=user;
        axios.post('http://localhost:5000/signin',{email,password})
        .then((res)=>{
          if(res.status === 200){
            console.log("user sign in succsessfull");
            //
              a.email = email;
              a.password = password;
              console.log("data in Context API", a.email, a.password);
            //
            navigate("/UserProfile",{state:{email,password}});
          }
          else{
            alert("Wrong credential, please try again")
          }
        })
        .catch(err=>{console.log(err)
          alert("Wrong credential, please try again")
        });
    }
  return (
    <>
    <section className="vh-100" style={{"backgroundColor": "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{"borderRadius": "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                <form className="mx-1 mx-md-4">


                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" name="email" onChange={handleInputs} className="form-control" />
                      <label className="form-label"   htmlFor="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" name="password" onChange={handleInputs} className="form-control" />
                      <label className="form-label"  htmlFor="form3Example4c">Password</label>
                    </div>
                  </div>

                         

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" onClick={submit} className="btn btn-primary btn-lg">Sign In</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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

export default SignIn