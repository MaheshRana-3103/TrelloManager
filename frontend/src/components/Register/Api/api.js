import axios from "axios"

export const registerApi = async (payload)=>{
    try{
       const response = await axios.post('http://localhost:1000/api/v1/sign-in',payload);
       console.log(response)
       return response;
    }
    catch(err){
       console.log(err);
       return err;
    }

}
export const googleRegisterApi = async (payload) => {
   try {
       const response = await axios.post('http://localhost:1000/api/v1/auth/google', payload);
       return response;
   } catch (err) {
       console.log(err);
       return err;
   }
};