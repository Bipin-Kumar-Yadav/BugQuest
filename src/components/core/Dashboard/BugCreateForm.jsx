import React,{useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Btn from '../../common/Btn'
import { apiConnector } from '../../../services/apiConnector'
import { createBug } from '../../../services/operations/userAPI'
const BugCreateForm = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [developers,setDevelopers] = useState(null);
    const [file,setFile] = useState(null);
    const url = BASE_URL + `/profile/getAll-developers`
    const {
        register,
        handleSubmit,
        reset,
        formState : {errors,isSubmitSuccessful}
    } = useForm();
    
    useEffect(()=>{
        const fetchedDevlopers = async ()=>{
            setLoading(true)
            const response = await apiConnector("GET",url,null,{
                Authorization: `Bearer ${token}`
            })
            setDevelopers(response.data);
            setLoading(false)
        }
        fetchedDevlopers();
        
    },[])

    const handleFileChange =(e) =>{
        const File = e.target.files[0];
        console.log(File);
        setFile(File);
    }

    const submitData = (data) => {
        // dispatch(createBug(token,data,navigate))
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
        
            // Append other form data fields to the FormData object
            formData.append('title', data.title);
            formData.append('desc', data.desc);
            formData.append('priority', data.priority);
            formData.append('assignedTo', data.assignedTo);
        
            dispatch(createBug(token, formData, navigate));
          } else {
            // Handle the case where no file is selected
            dispatch(createBug(token, data, navigate));
          }
        
          reset(data);
    }

  return (
    <div>
      {
        loading ? (<div>Loading...</div>): 
        !developers ? <div>No Developer Found</div> :  <form onSubmit={handleSubmit(submitData)} className='flex flex-col gap-2 bg-richblue-600 rounded-lg px-10 py-5 text-richblue-25'>
            <p className=' text-richblack-25 font-semibold text-xl'>Create a new Bug</p>
            <label htmlFor="title">
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder='Enter Title Here'
                    {...register("title",{required: true})}
                    className='text-richblack-300 bg-richblue-900 w-full px-6 py-3 rounded-lg'
                />
                    {errors.title && (<span>Please Enter title</span>)}
                
            </label>
            <label htmlFor="desc">
                <input
                    type='text'
                    id='desc'
                    name='desc'
                    placeholder='Enter description here'
                    {...register("desc",{required:true})}
                    className='text-richblack-300 bg-richblue-900 w-full px-6 py-3 rounded-lg'
                />
                  {errors.desc && (<span>Please Enter Description</span>)}
                

                </label>
                <div>
                    <label htmlFor='file'>
                        <input
                            type='file'
                            id='file'
                            name='file'
                            {
                                ...register("file")
                            }
                            
                            onChange={handleFileChange}

                        />
                    </label>
                </div>
                <div  className='flex justify-between text-richblack-25 font-bold'>
                
                Set Priority : 
            <label
                htmlFor='Low'
                className='flex text-richblack-25 font-semibold text gap-2'
                 
            >
                Low
                <input
                    type='radio'
                    id='Low'
                    name='priority'
                    value="Low"
                    {...register("priority",{required:true})}
                   
                />
                
            </label>
            <label
                htmlFor='Medium'
                className='flex text-richblack-25 font-semibold text gap-2'
            >
                Medium
                <input
                    type='radio'
                    id='Medium'
                    name='priority'
                    value="Medium"
                    {...register("priority",{required:true})}
                />
            
            </label>
            <label
                htmlFor='High'
                className='flex text-richblack-25 font-semibold text gap-2'
            >
                High
                <input
                    type='radio'
                    id='High'
                    name='priority'
                    value="High"
                    {...register("priority",{required:true})}
                />
            </label>
                </div>
           <div className='flex gap-3 text-richblack-25 font-bold'>
           Assign Developer :
           <label htmlFor='assignedTo'>
                <select
                 id='assignedTo'
                 name='assignedTo'
                 {...register("assignedTo",{required:true})}
                 className='text-richblack-300 bg-richblue-900 w-full px-6 py-1 rounded-lg '
                >
                {
                    developers.data.map((ele,ind)=>(
                        <option key={ind} value={ele._id}>{ele.firstName+" "+ele.lastName}</option>
                    ))
                }
                {errors.assignedTo && (<span>Please assigned it</span>)}
                </select>
            </label>
           </div>
            <Btn type={"submit"}>Submit</Btn>

        </form>
      }
    </div>
  )
}

export default BugCreateForm
