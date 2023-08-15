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
                <div className='w-screen flex gap-4'>
                    <div className='w-[20%] '>
                            <Sidebar/>
                    </div>
                    <div className=' flex w-[80%] py-10'>
                          <div className='w-[75%] mx-auto'>
                            <Outlet/>
                          </div>
                    </div>
                </div>
            </div>
          )
    }
 
}

export default Dashboard
