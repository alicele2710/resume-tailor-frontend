import axios from 'axios';
//registration
export const registerAPI = async(userData)=>{
    const response = await axios.post("http://localhost:8091/api/v1/users/register", {
        email: userData?.email,
        password: userData?.password,
        username: userData?.username,
    },{
        withCredentials: true,
    });
    return response?.data;


};

//log in 
export const loginAPI = async(userData)=>{
    const response = await axios.post("http://localhost:8091/api/v1/users/login", {
        email: userData?.email,
        password: userData?.password,

    },{
        withCredentials: true,
    });
    return response?.data;


};
//check auth 
export const checkUserAuthStatusAPI = async()=>{
    const response = await axios.get("http://localhost:8091/api/v1/users/auth/check", {
        withCredentials: true,
    });
    return response?.data;


};
//log out
export const logoutAPI = async()=>{
    const response = await axios.post("http://localhost:8091/api/v1/users/logout",{}, {
        withCredentials: true,
    });
    return response?.data;


};

//get profile
export const getUserProfileAPI = async()=>{
    const response = await axios.get("http://localhost:8091/api/v1/users/profile", {
        withCredentials: true,
    });
    return response?.data;


};