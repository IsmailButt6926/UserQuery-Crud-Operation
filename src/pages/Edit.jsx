import React,{useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { singleStudentDetail } from '../services/view'
import { editData } from '../services/Edit'
import { useMutation, useQuery } from '@tanstack/react-query'
import LoadingSpinner from "../components/LoadingSpinner"
import Toaster from '../components/Toaster/Toaster'
const Edit = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [singleStudentData, setSingleStudentData] = useState({
    id:"",
    name:"",
    email:""
  })
  console.log("params",params.id)

  const [check, setCheck] = useState(false)

  const {data, isLoading,isError } = useQuery(["singleStudentData"], () => singleStudentDetail(params.id),
  {
    onSuccess(data){
      setSingleStudentData(data?.data)
    }
  })

  useEffect(() => {
    if(isError){
      setCheck(true)
    }
  })

  const {mutate,isLoading:loadingEditData} = useMutation((data) => editData(data,params.id))

  const handleChange = (e) => {
    setSingleStudentData({
      ...singleStudentData,
      [e.target.name]:e.target.value
    })
  }

  const handleEdit = () => {
    mutate(singleStudentData)
    navigate("/")

  }

  return (
    <div>
      <h2 className='text-3xl font-bold'>Edit Student</h2>
      {
        isLoading ? <LoadingSpinner size={"50px"}/> : 
        <form>

        <div className="mb-6">
                      <input type="text" disabled value={singleStudentData?.id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
  
                  <div className="mb-6">
                      <input type="text" name='name' value={singleStudentData?.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                      <input type="email" name="email" value={singleStudentData?.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <button type="submit" onClick={handleEdit} className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loadingEditData ? <LoadingSpinner /> : "Edit Student"}  </button>
              </form>
  

      }
      {check ? <Toaster/> : ""}
     
    </div>
  )
}

export default Edit