import axios from "axios";

export const editData = async (data,id) => {
    try {
        const response = await axios.put(`http://localhost:3004/students/${id}`,data)
        return response
    } catch (error) {
        console.log(error)
    }
}