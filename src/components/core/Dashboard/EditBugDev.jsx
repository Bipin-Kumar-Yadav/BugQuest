import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Btn from '../../common/Btn';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { updateBugById } from '../../../services/operations/userAPI';
const EditBugDev = () => {
  const BASE_URL  = process.env.REACT_APP_BASE_URL;
  const [Bug,setBug] = useState();
  const params = useParams();
  const bugId = params.id.substring(1);
  const url = BASE_URL + `/bug/getBugById/:${bugId}`;
  const dispatch = useDispatch();
  const {token} = useSelector((state)=> state.auth)
  const navigate = useNavigate();
  const {
    reset,
    handleSubmit,
    errors,
    register,
  } = useForm();

  const onSubmitHandle = async (data)=>{
    data.bugId=bugId;
    data.createdBy=Bug.data.createdBy;
    data.assignedTo = Bug.data.assignedTo;
    dispatch(updateBugById(token,data,navigate));
  }

  useEffect(()=>{
    const fetchBug = async (req,res) =>{
      try{
        const response = await apiConnector("GET",url);
    if(!response.data.success){
        throw new Error("Bug not found")
    }
    setBug(response.data);
    }
    catch(error){
        console.log(error ,"while getting but to edit")
    }
    }
    fetchBug();
  },[])

  return (
    <div>
      {
        !Bug ? (<div>No Bug Found</div>) :
        (
          
            Bug.data.status === "Closed" ? (
              <div className='text-richblack-25 font-bold mx-auto text-xl flex justify-center'>Bug is Solved</div>
            ) : (

              <form onSubmit={handleSubmit(onSubmitHandle)} className='flex flex-col gap-2 bg-richblue-600 px-10 py-5 rounded-lg'>
      <label htmlFor='title'
        className='flex flex-col gap-2 text-richblack-25 font-semibold'>
                Title :
                <input
                    id='title'
                    name='title'
                    defaultValue={Bug.data.title}
                    {...register("title",{required:true})}
                    
                    className='text-richblack-300 bg-richblue-900 w-full px-6 py-3 rounded-lg'
                />

            </label>
            <label htmlFor='desc'
            className='flex flex-col gap-2 text-richblack-25 font-semibold'>
                Description :
                <input
                    id='desc'
                    name='desc'
                    defaultValue={Bug.data.desc}
                    {...register("desc",{required:true})}
                    className='text-richblack-300 bg-richblue-900 w-full px-6 py-3 rounded-lg'
                />
            </label>
            <label htmlFor='status' className='flex flex-col gap-2 text-richblack-25 font-semibold'>
              Status :
              <select
                id='status'
                name='status'
                {...register("status",{required:true})}
                defaultValue={Bug.data.status}
                    className='text-richblack-300 bg-richblue-900 w-full px-6 py-3 rounded-lg'
              >
                <option value='Open'>Open</option>
                <option value='In Progress'>In Progress</option>
                <option value='Closed'>Closed</option>
              </select>
            </label>
            <Btn type={"submit"}>Submit</Btn>
           </form>
            )
          
        )
      }
    </div>
  )
}

export default EditBugDev
