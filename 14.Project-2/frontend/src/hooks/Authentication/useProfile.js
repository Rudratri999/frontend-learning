import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/authService";

export function useProfile (){
    return useQuery({
        queryKey : ["/profile"],
        queryFn : getProfile
    })
}