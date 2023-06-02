import axios from "axios"


export const getData = async (pageNumber) => {
    try {
    const response = await axios.get(`http://localhost:3004/students?_limit=2&_page=${pageNumber}`)
    return response
    } catch (error) {
        console.log(error)
    }
}

export const deleteData = async (id) => {
    try {
        const response= await axios.delete(`http://localhost:3004/students/${id}`)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const postData = async (data) => {
    try {
        const response = await axios.post("http://localhost:3004/students",data)
        return response
    } catch (error) {
        console.log(error)
    }
}