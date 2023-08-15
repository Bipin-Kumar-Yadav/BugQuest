import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../services/apiConnector';
import { useSelector } from 'react-redux';
const UserDisplayName = ({userId}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const {token} = useSelector((state)=> state.auth);
    const userid=userId;
    const [userAllDetails,setUserAllDetails] = useState(null)
    useEffect(()=>{
        const url = BASE_URL + `/profile/userAllDetails/${userid}`;
       
        const fetchUserName = async () =>{
            try{
                const response = await apiConnector("GET",url,null, {
                    Authorization: `Bearer ${token}`
                });
                console.log(response.data)
                setUserAllDetails(response.data);
            }
            catch(error){
                console.error("Error while fetching user details",error);
            }
        }
        fetchUserName();
    },[userid])
  return (
    <div>
      {
        userAllDetails ? <p>{userAllDetails.data.firstName+" "+userAllDetails.data.lastName}</p> : (" ")
      }
    </div>
  )
}

export default UserDisplayName
