import React, { useEffect , useState} from 'react'
import {useContext} from 'react'
import treeContext from '../context/treeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function UserProfile() {
    const navigate=useNavigate();
    const {state}=useLocation();
    const [newFamilyName, setNewFamilyName] = useState();
    const [familylist, setFamilylist] = useState([]);
    const [allFamilyList, setAllFamilyList] = useState([]);
    const {email}=state;
    const {password}=state;
    console.log("from state",email, password);
    
    useEffect(() => {
        axios.post("http://localhost:5000/getfamilylist",{email,password})
        .then((res)=>{
            const {user, allFamily}=res.data;
            setFamilylist(user);
            setAllFamilyList(allFamily);
        })
    },[]);

    function clickOnModify(index) {
        console.log(familylist[index], index);
        let familyObj = familylist[index];
        navigate('/ModifyTree', {state: {familyObj}})
    }

    let fieldName,fieldValue;
    const handleInputs=(e)=>{
        fieldName=e.target.name;
        fieldValue=e.target.value;
        setNewFamilyName({...newFamilyName,[fieldName]:fieldValue})
    }

    function clickOnNewFamily(){
        let isFound = false;
        allFamilyList.map((data)=>{
            console.log(data.familyName, newFamilyName.familyName);
            if(data.familyName==newFamilyName.familyName){
                isFound = true;
            }
        });
        if(isFound===true){
            console.log("Founded");
            alert('This FAMILY-NAME is already taken, Please try with another name like (surname_1 or surname_2)');
        }else{
            navigate('/createFamilyTree', {state: {newFamilyName, email, password}});
        }
    }

  return (
    <>
        <div>
            <section className="vh-100" style={{"backgroundColor": "#eee"}}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{"borderRadius": "25px"}}>
                        <div className="card-body p-md-5">
                            <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Create New Family</p>

                                <form className="mx-1 mx-md-4">


                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                        <div className="d-grid gap-2">
                                        <input type="text"  name="familyName" className="form-control" id="exampleInputEmail1" onChange={handleInputs} aria-describedby="Help" placeholder="Enter new family name"/>
                                        <button className="btn btn-primary" style={{margin: '20px'}} type="button" onClick={clickOnNewFamily}>Add New Family</button>
                                        </div>
                                    </div>
                                </div>
                                
                                <br></br>
                                <br></br>
                                <br></br>
                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Families Created by You</p>

                                <form className="mx-1 mx-md-4">


                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    {familylist.map((data, index) => (
                                        <div className="text-uppercase" style={{margin: '15px'}}>
                                        <div className="card ms-auto mb bg-light" style={{borderColor:'#34495e'}}>
                                            <div className="card-body">
                                                {data.familyName}
                                                <button type="button" className="btn btn-warning float-end" onClick={() => clickOnModify(index)}>Modify</button>
                                            </div>
                                        </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                </form>

                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

        </div>
    </>
  )
}


/*

<div>
                <div className="container my-5" style={{ margin: 'auto'}}>
                    <div className="text-center mb-5" style={{margin: '15px'}}>
                    <h3>Already Created Families</h3>
                </div>

                <div>
                {familylist.map((data, index) => (
                    <div className="text-uppercase" style={{margin: '15px'}}>
                    <div className="card ms-auto mb bg-light" style={{borderColor:'#34495e'}}>
                        <div className="card-body">
                            {data.familyName}
                            <button type="button" className="btn btn-warning float-end" onClick={() => clickOnModify(index)}>Modify</button>
                        </div>
                    </div>
                    </div>
                ))}
                
                <div className="d-grid gap-2">
                <input type="text"  name="familyName" className="form-control" id="exampleInputEmail1" onChange={handleInputs} aria-describedby="Help" placeholder="Enter new family name"/>
                <button className="btn btn-primary" style={{margin: '20px'}} type="button" onClick={clickOnNewFamily}>Add New Family</button>
                </div>

                </div>
                
            </div>


*/