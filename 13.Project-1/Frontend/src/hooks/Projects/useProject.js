import { useQuery } from "@tanstack/react-query";
import { getProjectById, getProjects } from "../../services/projectService";


export function useProject() {

    return useQuery({
        queryKey: ["projects"],
        queryFn: getProjects,
    });

}

export function useProjectById (id){

    return useQuery({
        queryKey:["project" , id],
        queryFn : ()=>getProjectById(id)
    })
}

