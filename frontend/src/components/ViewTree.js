import React from 'react'
import axios from "axios"
function ViewTree() { 
  // let data=AxiosResponse;
  // console.log(data);

const fetchData = () => {
 axios.get("/viewFamilyTree")
      .then((response) => console.log(response.data)).catch((err)=>console.log(err));};
  return (
    <>
    <button onClick={fetchData}>Fetch</button>
    </>
  )
}

export default ViewTree