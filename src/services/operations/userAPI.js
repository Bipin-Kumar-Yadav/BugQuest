import { toast } from "react-hot-toast";
import {apiConnector} from '../apiConnector'
import { profileEndpoints } from "../apis";
import {setDevelopers, setLoading} from "../../slices/ProfileSlice"


const {UPDATE_PROFILE_API,UPDATE_PROFILE_IMG,GETALL_DEVLOPERS,CREATE_BUG,UPDATE_BUG,GET_ALL_DETAILS} = profileEndpoints;

export function updateProfile (token,formData,navigate){

    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",UPDATE_PROFILE_API,formData
                         
            ,
            {
                Authorization: `Bearer ${token}`
            }
            )
            console.log(response.data.success)
            if(!response.data.success){
                throw new Error(response.data.error);
            }
            
            toast.success("Profile Details Updated");
            navigate("/dashboard/my-profile");

        }
        catch(error){
            console.log(error)
            console.log("Updating Profile error ", error)
            toast.error("Could Not Updata Profile")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }

}



export function createBug (token,formData,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",CREATE_BUG,formData,{
                Authorization :   `Bearer ${token}`
            })
            if(!response.data.success){
                throw new Error(response.data.error);
            }
            toast.success("Bug created successfully")
            navigate("/dashboard/bugs")
            

        }catch(error){
            console.log(error)
            console.log("Error while creating bug")
            toast.error("could not create bug")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function updateBugById (token,formData,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",UPDATE_BUG,formData,{
                Authorization :   `Bearer ${token}`
            })
            if(!response.data.success){
                throw new Error(response.data.error);
            }
            toast.success("Bug Updated successfully")
            navigate("/dashboard/bugs")
            

        }catch(error){
            console.log(error)
            console.log("Error while updating bug")
            toast.error("could not update bug")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function deleteBug (token,url,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",url,null,{
                Authorization :   `Bearer ${token}`
            })
            if(!response.data.success){
                throw new Error(response.data.error);
            }
            toast.success("Bug deleted successfully")
            navigate("/dashboard/bugs")
            

        }catch(error){
            console.log(error)
            console.log("Error while deleting bug")
            toast.error("could not delete bug")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

