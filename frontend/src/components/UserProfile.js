import React from 'react'
import {useContext} from 'react'
import treeContext from '../context/treeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserProfile() {
    const a = useContext(treeContext);
    console.log(a.familyName);

    const Fruits = [
        { name: 'Apple' },
        { name: 'Apricot' }, 
        { name: 'Honeyberry' },
        { name: 'Papaya' },
      ];
      function clickOnModify(index) {
        console.log(index);
      }
  return (
    <>
        <div>
                <div class="container my-5" style={{ margin: 'auto'}}>
                    <div class="text-center mb-5" style={{margin: '15px'}}>
                    <h3>Already Created Families</h3>
                </div>

                <div>
                {Fruits.map((data, index) => (
                    <p class="text-uppercase" style={{margin: '15px'}}>
                    <div class="card ms-auto mb bg-light" style={{borderColor:'#34495e'}}>
                        <div class="card-body">
                            {data.name}
                            <button type="button" class="btn btn-warning float-end" onClick={() => clickOnModify(index)}>Modify</button>
                        </div>
                    </div>
                    </p>
                ))}
                
                <div class="d-grid gap-2">
                <button class="btn btn-primary" style={{margin: '20px'}} type="button">Add New Family</button>
                </div>

                </div>
                
            </div>
        </div>
    </>
  )
}
