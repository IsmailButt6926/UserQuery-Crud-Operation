import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { singleStudentDetail } from '../services/view'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from "../components/LoadingSpinner"
import Toaster from '../components/Toaster/Toaster'
const View = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [singleStudentData, setSingleStudentData] = useState({
    name:"",
    email:""
})
  console.log("params",params.id)

  const {data, isLoading,isError,error } = useQuery(["singleStudentData"], () => singleStudentDetail(params.id),
  {
    onSuccess(data){
      setSingleStudentData(data?.data)
    },
    onError() {
      <Toaster/>
    },
  })

  useEffect(() => {
    if(isError) {
      // console.log("error in api")
      // alert("Error")
      <Toaster/>
    }
  },[isError])

  const handleHome = () => {
    navigate("/")
  }
  return (
    <div>
      <h2 className='text-3xl font-bold'>Student Details</h2>

    {isLoading ? <LoadingSpinner/> : 
    <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 mb-8">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                      
                                <>
                                    <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                           {singleStudentData?.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {singleStudentData?.name}

                                        </td>
                                        <td className="px-6 py-4">
                                            {singleStudentData?.email}

                                        </td>

                                    </tr>
                                </>
                           


                    </tbody>
                </table>
            </div>
    </>
    }
    
      


            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={handleHome}>Back to home</button>

    </div>
  )
}

export default View