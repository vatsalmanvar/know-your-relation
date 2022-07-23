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
                <div className="container my-5" style={{ margin: 'auto'}}>
                    <div className="text-center mb-5" style={{margin: '15px'}}>
                    <h3>Already Created Families</h3>
                </div>

                <div>
                {familylist.map((data, index) => (
                    <div className="text-uppercase" style={{margin: '15px'}}>
                    <div className="card ms-auto mb bg-light" style={{borderColor:'#34495e'}}>
                        <div className="card-body">
                            {index+1}
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
        </div>
    </>
  )
}
