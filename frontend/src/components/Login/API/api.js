import axios from "axios"

export const loginApi = async (payload)=>{
    console.log(payload);
    try{
       const response = await axios.post('http://localhost:1000/api/v1/login',payload);
       console.log(response)
       return response;
    }
    catch(err){
       console.log(err);
       return err;
    }

}
