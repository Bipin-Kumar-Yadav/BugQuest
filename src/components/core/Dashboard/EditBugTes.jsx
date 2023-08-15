import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../../services/apiConnector';
import { useNavigate, useParams } from 'react-router-dom';
import Btn from '../../common/Btn';
import { useDispatch, useSelector } from 'react-redux';
import { updateBugById } from '../../../services/operations/userAPI';

const EditBugTes = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const {token} = useSelector((state)=> state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const bugId = params.id.substring(1);

    const [Bug,setBug] = useState(null);
    const url = BASE_URL + `/bug/getBugById/:${bugId}`;
    const {
        register,
        reset,
        handleSubmit,
        errors
    } = useForm();
    const onSubmitHandle= (data) =>{
        data.bugId = bugId;
        data.createdBy = Bug.data.createdBy
        data.status = Bug.data.status
        data.assignedTo = Bug.data.assignedTo
        dispatch(updateBugById(token,data,navigate))

    }
    useEffect(()=>{
        const fetchBug = async (req,res) => {
         
            
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
        Bug !== null ?
        (
          Bug.data.status==="Closed"? (<div className='text-richblack-25 font-bold text-2xl mx-auto flex justify-center items-center'>Bug is Solved</div>): (
            <form onSubmit={handleSubmit(onSubmitHandle)} className='flex flex-col bg-richblue-600 rounded-lg px-10 py-5 gap-2'>
            <label htmlFor='title' className='text-richblack-25 font-semibold flex flex-col gap-2'>
                <p>Title :</p>
                <input
                    id='title'
                    name='title'
                    defaultValue={Bug.data.title}
                    {...register("title",{required:true})}
                    className='text-richblack-300 bg-richblue-900 w-full px-6 py-3 rounded-lg'
                />

            </label>
            <label htmlFor='desc'
                 className='text-richblack-25 font-semibold flex flex-col gap-2'
            >
                Description :
                <input
                    id='desc'
                    name='desc'
                    defaultValue={Bug.data.desc}
                    {...register("desc",{required:true})}
                    className='text-richblack-300 bg-richblue-900 w-full px-6 py-3 rounded-lg'
                />
            </label>
            <div className='flex justify-between text-richblack-25 font-semibold'>
            Set Priority :
            <label htmlFor='Low'
            className='flex gap-2 '>
                Low : 
                <input
                    type='radio'
                    id='Low'
                    name='Low'
                    value='Low'
                    defaultChecked = {Bug.data.priority === "Low"}
                    {...register("priority")}
                ></input>

            </label>
            <label htmlFor='Medium'
                className='flex gap-2'
            >
                Medium :
                <input
                    type='radio'
                    id='Medium'
                    name='Medium'
                    value='Medium'
                    defaultChecked = {Bug.data.priority === "Medium"}
                    {...register("priority")}
                ></input>

            </label>
            <label htmlFor='High'
                className='flex gap-2'
            >
                High :
                <input
                    type='radio'
                    id='High'
                    name='High'
                    value='High'
                    defaultChecked = {Bug.data.priority === "High"}
                    {...register("priority")}
                ></input>

            </label>
            </div>
            <Btn type={"submit"}>Submit</Btn>

        </form>
          )
        )
        :
        (<div>Loading..</div>)
        
      }
    </div>
  )
}

export default EditBugTes