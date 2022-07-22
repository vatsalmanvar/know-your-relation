import React from 'react'
import {useContext} from 'react'
import treeContext from '../context/treeContext';


export default function UserProfile() {
    const a = useContext(treeContext);
    console.log(a.familyName);
  return (
    <div>
        UserProfile
        

    </div>
  )
}
