import axios from 'axios';
//stripe payment
export const handleFreeSubscriptionAPI = async()=>{
    const response = await axios.post("http://localhost:8091/api/v1/stripe/free-plan", {
    },{
        withCredentials: true,
    });
    return response?.data;


};
