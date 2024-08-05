import axios from "axios"
export const registerApi = async (payload)=>{
    const URL=import.meta.env.REACT_BACKEND_URL
    try{
       const response = await axios.post(`${URL}/api/v1/sign-in`,payload);
       return response;
    }
    catch(err){
       console.log(err);
       return err;
    }

}