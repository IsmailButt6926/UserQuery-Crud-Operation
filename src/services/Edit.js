import axios from "axios";

export const editData = async (data,id) => {
    try {
        const response = await axios.put(`http://localhost:30004/students/${id}`,data)
        return response
    } catch (error) {
        console.log(error)
    }
}