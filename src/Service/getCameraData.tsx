import { ApiResponse, cameraDto } from "../CamerDataType/CameraDataDto";
const API_BASE_URL = 'https://api-app-staging.wobot.ai/app/v1';
const TOKEN = '4ApVMIn5sTxeW7GQ5VWeWiy';

export const getCameraData = async ():Promise<ApiResponse> => {
 
   try{
      const response = await fetch (`${API_BASE_URL}/fetch/cameras`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }
        
    });
    if (!response.ok) {
         (alert('Try Again'));
    }
     const data =  response.json(); 
     return data
   }catch (err) {
    return  {message:'Try Again' ,data:[] }
}
}
export const UpdateCameraData = async (status:string , id:number) => {

    try{
       const response = await fetch (`${API_BASE_URL}/update/camera/status?${status}`,{
         method:'POST',
         headers:{
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${TOKEN}`
         },
         body:JSON.stringify({id,status})
     });
     if (!response.ok) {
          (alert('Try Again'));
     }else{
      return response
     }
     
    }catch (err) {
     return  {message:'Try Again' ,data:[] }
 }
 }
 