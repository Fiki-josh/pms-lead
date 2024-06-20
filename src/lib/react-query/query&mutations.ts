import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { createProject, createUserAccount, getProjects, signIntoAccount } from "../firebase/api";
import { INewUser, IProject, ISignUser } from "../../types";

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (userData: INewUser) => createUserAccount(userData)
    })
}

export const useSignInUser = () => {
    return useMutation({
        mutationFn: (data: ISignUser) => signIntoAccount(data)
    })
}

export const useCreateProject = () => {
    return useMutation({
        mutationFn: (data: IProject) => createProject(data)
    })
}

export const useGetprojects = () => {
    return useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: getProjects,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage?.nextPage
    })
}