import React from 'react'
import HighLightText from '../components/core/HomePage/HighLightText'
import hero from "../assests/images/hero-homepage.png"
import CTAButton from '../components/core/HomePage/CTAButton'
import Feature from '../components/core/HomePage/Feature'
import devloper from "../assests/images/devloper.png"
import tester from "../assests/images/tester.png"
import Footer from '../components/common/Footer'
const Home = () => {
  return (
    <div className='mt-10'>
       
       {/* section 1 */}
       <div className=' bg-richblue-900'>
       <div className='mx-auto w-11/12 max-w-maxContent flex  md:justify-between md:flex-row flex-col lg:py-20 md:py-15'>
                <div className='w-[100%] md:w-[45%]'>
                    <div className='lg:mt-16 md:mt-[10]'>
                        <p className='lg:text-3xl md:text-2xl text-richblack-25 font-bold mb-4'>Welcome to,</p>
                        <HighLightText text={"BugQuest"}/>
                    </div>
                    <p className='lg:text-[20px] md:text-[18px] mt-5 mb-4 lg:mb-11 md:mb-4 text-richblack-50 lg:leading-8 md:leading-6'>
                    Welcome to BugQuest, the premier platform for bug hunters and organizations to collaborate and improve software security. We connect skilled security researchers with companies seeking to fortify their systems against vulnerabilities.
                    </p>
                    <div className='flex lg:flex-row gap-4 lg:gap-4 md:gap-2 md:flex-col mb-6'>
                    <CTAButton active={true} linkto={"/signup"}>Join the Hunt</CTAButton>
                    <CTAButton active={false} linkto={"/about"}>Why BugQuest </CTAButton>
                    </div>
                    
                </div>
                <div className='w-[90%] md:w-[50%] '>
                    <img src={hero} alt=" "/>
                </div>         
        </div>
        
       </div>

        {/* section 2 */}
        <div className=' flex flex-col bg-richblue-700 items-center mx-auto '>
            <div className='w-11/12 max-w-maxContent flex flex-col gap-10 mt-10 mb-10'>
            <Feature src={devloper} heading={"Devlopers"} subheading={"Role of Devlopers"} text={`Bug Resolution Expertise\nSoftware Quality Enhancement\nCollaboration with Testers\nContinuous Integration and Deployment`} position={"lg:flex-row"} color={true}/>
            <Feature src={tester} heading={"Testers"} subheading={"Role of Testers"} text={`Bug Identification and Reporting\nUser Experience Evaluation\nRegression Testing\nCollaboration with Developers`} position={"lg:flex-row-reverse"} color={false}/>
            </div>
        </div>
        
        {/* Footer section  */}
        <div className=' bg-richblack-900'>      
        <Footer/>
        </div>
    </div>
  )
}

export default Home
