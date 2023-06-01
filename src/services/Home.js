import axios from "axios"


export const getData = async () => {
    try {
    const response = await axios.get("http://localhost:30004/students")
    return response
    } catch (error) {
        console.log(error)
    }
}

export const deleteData = async (id) => {
    try {
        const response= await axios.delete(`http://localhost:30004/students/${id}`)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const postData = async (data) => {
    try {
        const response = await axios.post("http://localhost:30004/students",data)
        return response
    } catch (error) {
        console.log(error)
    }
}