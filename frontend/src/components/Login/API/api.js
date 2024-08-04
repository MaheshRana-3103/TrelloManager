import axios from "axios"

export const loginApi = async (payload)=>{
    try{
       const response = await axios.post(`${process.env.BACKEND_URL}/api/v1/login`,payload);
       return response;
    }
    catch(err){
       console.log(err);
       return err;
    }

}
