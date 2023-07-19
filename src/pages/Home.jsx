import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getData, deleteData, postData, searchQuery } from '../services/Home';
import axios from 'axios'
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Toaster from '../components/Toaster/Toaster';


const Home = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("")
    const [studentData, setStudentData] = useState([])

    const [studentvalue, setStudentValue] = useState({
        name: "",
        email: ""
    })

    const [check, setCheck] = useState(false)

    //pageSize define k ketna data aik page ma ay ga
    const [pageSize, setPageSize] = useState(5)
    const numOfTotalPages = Math.ceil(studentData.length / pageSize)
    const pages = [...Array(numOfTotalPages + 1).keys()].slice(1)


    //getData
    const { data, isLoading, isError, refetch } = useQuery(["fetchStudents"], () => getData(),
        {
            enabled: false,
            onSuccess(data) {
                setStudentData(data?.data)
            }
        }
    )

    useEffect(() => {
        refetch()
    }, [])


    //DeleteData
    const { mutate, data: RemoveStudent, isLoading: loadingDelete } = useMutation((id) => deleteData(id),
        {
            onSuccess() {
                refetch()
                swal("client deleted");
            }
        }
    )

    //postData
    const { mutate: createUser, data: createUSerData, isLoading: loadingUser } = useMutation((data) => postData(data),)

    //In React Query, setting enabled to false for a specific query or mutation means that the query or mutation will not be automatically triggered when the component mounts or any of its dependencies change. Essentially, it disables the automatic fetching or mutation functionality associated with that query or mutation.
    // The enabled option in React Query is used to control when the query or mutation should be enabled and triggered. By default, enabled is set to true, which means the query or mutation will be automatically triggered.
    const { data: searchData, isLoading: searchLoading, refetch: searchRefetch } = useQuery(["searchFilter", search], () => searchQuery(search), {
        enabled: false,
        onSuccess(data) {
            setStudentData(data?.data)
        }
    })

    useEffect(() => {
        if (search) {
            searchRefetch()
        }
    }, [search])

    useEffect(() => {
        if (isError) {
            setCheck(true)
        }
    }, [isError])

    const handleChange = (e) => {
        setStudentValue({
            ...studentvalue,
            [e.target.name]: e.target.value
        })
    }

    const handleView = (id) => {
        navigate(`/view/${id}`)

    }

    const handleEdit = (id) => {
        navigate(`./edit/${id}`)
    }

    const handleDelete = (id) => {
        mutate(id)
    }

    const handleSubmit = () => {
        createUser(studentvalue)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    return (
        <>
            <div className="text-3xl font-bold underline mb-6 text-center mt-2">Crud operation using React query</div>

            <form className='m-10'>
                <div className="mb-6 w-48">
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" name='name' value={studentvalue?.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-6 w-48">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" value={studentvalue?.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

            <div className='px-10 '>
            <input type="text" value={search} onChange={handleSearch} placeholder='Search' className='rounded-md'/>
            </div>
           
            {
                isLoading ? <LoadingSpinner size={"100px"} /> :
                    <>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 mb-8 px-10">

                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        studentData.map((element, index) =>
                                        (
                                            <>
                                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                                                    <td className="px-6 py-4">
                                                        {element?.id}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {element?.name}

                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {element?.email}

                                                    </td>
                                                    <td className='space-x-4'>

                                                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={() => handleView(element?.id)}>View</button>
                                                        <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={() => handleEdit(element?.id)}>Edit</button>
                                                        <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={() => handleDelete(element?.id)}>{loadingUser ? <LoadingSpinner /> : "Delete"}                </button>
                                                    </td>

                                                </tr>
                                            </>
                                        )
                                        )
                                    }


                                </tbody>
                            </table>
                        </div>


                    </>
            }

            {
                check ? <Toaster /> : ""
            }



        </>
    )
}

export default Home