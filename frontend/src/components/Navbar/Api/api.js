import axios from "axios"

export const getUserProfileApi = async(userId,token)=>{
    console.log("userid",userId)
    console.log("token",token)
    try{
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        console.log("Headers :",headers)

        const response = await axios.post('http://localhost:1000/api/v1/profile',{"userId":userId},{headers})
        return response;
    }
    catch(err){
        console.log(err);
        return err;
    }
}