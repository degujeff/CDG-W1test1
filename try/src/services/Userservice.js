import axios from 'axios';

//ประกาศตัวเเปรเก็บurl 
const API_URL = 'http://localhost:3001/users';

export const UserService = {
    //ดึงข้อมูลมาเเสดง 
    getAll: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },
    //สร้างข้อมูล
    create: async (data) => {
        await axios.post(API_URL, data);
    },
    //เเก้ไขข้อมูล
    update: async (id, data) => {
        await axios.patch(`${API_URL}/${id}`, data);
    },
    //ลบข้อมูล
    delete: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
    }
}