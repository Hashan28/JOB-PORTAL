import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Loading from '../components/Loading'
import kConvert from 'k-convert'
import Navbar from '../components/Navbar'
import moment from 'moment';
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'

const ApplyJobs = () => {

  const { id }= useParams()

  const [jobData,setJobData]=useState(null)

  const {jobs} = useContext(AppContext)

  const fetchjob= async()=>{
    const data = jobs.filter(job=> job._id=== id)
    if(data.length != 0){
      setJobData(data[0])
      console.log(data[0]);
      
    }
  }

  useEffect(()=>{
    if (jobs.length>0) {
      fetchjob()
    }
  },[id,jobs])

  return jobData ? (
    <>
      <Navbar/>
      <div className='container flex flex-col min-h-screen px-4 py-10 mx-auto 2xl:px-20'>
        <div className='w-full text-black bg-white rounded-lg '>
          <div className='flex flex-wrap justify-center gap-8 py-20 mb-6 md:justify-between px-14 bg-sky-50 border-sky-600 rounded-xl'>
            <div className='flex flex-col items-center md:flex-row'>
              <img className='h-24 p-4 mr-4 bg-white border rounded-lg max-md:mb-4' src={jobData.companyId.image} alt="" />
              <div className='text-center md:text-left text-neutral-700'>
                <h1 className='mb-2 text-2xl font-medium sm:text-4xl'>{jobData.title}</h1>
                <div className='flex flex-row flex-wrap items-center text-gray-600 max-md:justify-center gap-y-2 '>
                  <span className='flex items-center gap-1 pr-4'>
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData.companyId.name}
                  </span>
                  <span className='flex items-center gap-1 pr-4'>
                    <img src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>
                  <span className='flex items-center gap-1 pr-4'>
                    <img src={assets.person_icon} alt="" />
                    {jobData.level}
                  </span>
                  <span className='flex items-center gap-1 pr-4'>
                    <img src={assets.money_icon} alt="" />
                    CTC :{kConvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center text-sm text-end max-md:mx-auto max-md:text-center'>
              <button className='bg-blue-600 p-2.5 px-10 text-white rounded'>Apply Now</button>
              <p className='mt-1 text-gray-600'>Posted {moment(jobData.date).fromNow()}</p>
            </div>

          </div>

          <div className='flex flex-col items-start justify-between lg:flex-row'>
            <div className='w-full lg:w-2/3'>
              <h2 className='mb-4 text-2xl font-bold'>Job description</h2>
              <div className='rich-text' dangerouslySetInnerHTML={{__html:jobData.description}}></div>
              <button className='bg-blue-600 p-2.5 px-10 text-white rounded mt-10'>Apply Now</button>
            </div>
            {/* right section job description page  */}
            <div className='w-full mt-8 space-y-5 lg:w-1/3 lg:mt-0 lg:ml-8'>
              <h2>More jobs from {jobData.companyId.name}</h2>
              {jobs.filter(job => job._id !== jobData._id && job.companyId._id === jobData.companyId._id)
              .filter(job => true).slice(0,4)
              .map((job,index)=> <JobCard key={index} job={job} />)}
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </>
  ): (
    <Loading/>
  )
}


export default ApplyJobs