import {Sighting} from "../type.ts";
import {useMutation, useQuery, useQueryClient} from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useCreateSighting = () => {
    const createSightingRequest = async (sightingRequest: FormData)=>{
        const resp = await fetch(`${API_BASE_URL}/api/v1/sightings/create-sightings`,{
            method : "POST",

            body : sightingRequest
        });

        if(!resp.ok){
            throw new Error("Unable to place sighting")
        }
        console.log(resp);

        return resp.json();

    };

    const {
        mutate : createSighting,
        isLoading,
        error,
        isSuccess,
        reset
        } = useMutation(createSightingRequest);

    if(error){
        reset();
    }
    return{
        createSighting,
        isLoading,
        isSuccess
    }

};

export const useGetSightings = ()=>{
    const getSightingRequest = async (): Promise<Sighting[]> => {
        const resp = await fetch(`${API_BASE_URL}/api/v1/sightings`,{
            method: "GET",
            headers:{
                "Content_Type": "application/json"
            }
        });

        if(!resp.ok){
            throw new Error("Failed to get sightings");
        }
        return resp.json();

    }
    const {
        data: sightings,
        isLoading
        } = useQuery("fetchSightings", getSightingRequest);

    return {
        sightings,
        isLoading
    }
}

export const useDeleteSighting = ()=>{

    const deleteSightingReq = async(sightingId : string):Promise<void> =>{
        const resp = await fetch(`${API_BASE_URL}/api/v1/sightings/${sightingId}`,{
            method: "DELETE"
        });

        if(!resp.ok){
            throw new Error("Failed to delete sighting");
        }

    }
    const queryClient = useQueryClient();

    const {
        mutate: deleteSighting,
        isSuccess,
        isLoading} = useMutation( deleteSightingReq,{
            onSuccess: ()=>{queryClient.invalidateQueries('fetchSightings')}
        });

    return{deleteSighting, isSuccess, isLoading};

}

export const useUpdateSighting = ()=>{

    const updateSightingReq = async (sighting: FormData):Promise<Sighting>=>{

        const resp = await fetch(`${API_BASE_URL}/api/v1/sightings`,{
            method:"PUT",
            body: sighting
        });

        if(!resp.ok){
            throw new Error("Failed to update sighting");
        }
        return resp.json();

    }
    const {
        mutate : updateSighting,
        isLoading,
        isSuccess,
        }= useMutation(updateSightingReq);

    return{ updateSighting, isLoading, isSuccess}
}

export const useSearchSightings = (searchquery?: string) => {

    const createSearchRequest = async (): Promise<Sighting> => {
        const params = new URLSearchParams();

        if (searchquery) { params.set("searchquery", searchquery); }

        const resp = await fetch(
            `${API_BASE_URL}/api/v1/sightings/search?${params.toString()}`
        );

        if (!resp.ok) {
            throw new Error("Failed to get transfer");
        }

        return resp.json();
    };

    const { data: searchResult, isLoading, isSuccess } = useQuery(["searchTransfers", searchquery],
                                                createSearchRequest,
                                        { enabled: !!searchquery }
    );

    return {
        searchResult,
        isLoading,
        isSuccess
    };
};

