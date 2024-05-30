import {User, UserReq} from "../type.ts";
import {useMutation, useQuery} from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useCreateUser = () => {
    const createUserReq = async (userReq: UserReq):Promise<User>=>{
        const resp = await fetch(`${API_BASE_URL}/api/v1/user`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(userReq)
        });
        if(!resp.ok){
            throw new Error("Failed to create user");
        }
        return resp.json();

    };
    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createUserReq);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    }

};

// export const useGetUsers= ()=>{
//     const getUserRequest = async (): Promise<User> =>{
//
//         const resp = await fetch(`${API_BASE_URL}/api/v1/user`,{
//             method:'GET',
//         });
//         if(!resp.ok){
//             throw new Error('Failed to fetch user');
//         }
//
//         return resp.json();
//     }
//     const {
//         data: currentUser,
//         isLoading,
//     } = useQuery("fetchCurrentUser", getUserRequest);
//
//     return{
//         currentUser,
//         isLoading
//     }
// }

export const useGetUserByEmail= (email:string)=>{
    const getUserRequest = async (): Promise<User> =>{

        const resp = await fetch(`${API_BASE_URL}/api/v1/user/${email}`,{
            method:'GET',
        });
        if(!resp.ok){
            throw new Error('Failed to fetch user');
        }

        return resp.json();
    }
    const {
        data: currentUser,
        isLoading,
    } = useQuery("fetchCurrentUser", getUserRequest);

    return{
        currentUser,
        isLoading
    }
}