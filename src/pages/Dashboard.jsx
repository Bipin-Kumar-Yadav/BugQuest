import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    const {loading:authLoading} = useSelector((state) => state.auth)
    const {loading:profileLoading} = useSelector((state)=> state.auth)

    if(authLoading || profileLoading){
        return <div>loading...</div>
    }
    else{
        return (
            <div className="bg-richblue-900 h-screen">
                <div className='flex flex-col h-full'>
                    <div className='w-[25%] mt-14'>
                            <Sidebar/>
                    </div>
                    <div className='w-[50%] items-center mx-auto mt-14 '>
                            <Outlet/>
                    </div>
                </div>
            </div>
          )
    }
 
}

export default Dashboard
