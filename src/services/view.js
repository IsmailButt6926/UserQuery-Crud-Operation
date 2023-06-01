import axios from "axios";

export const singleStudentDetail = async (id) => {
    try {
        const response = await axios.get(`http://localhost:30004/students/${id}`)
        return response
    } catch (error) {
        console.log(error)
    }
}