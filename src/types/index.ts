export type INewUser = {
    name: string;
    email: string;
    password: string;
    department: string;
}

export type ISignUser = {
    email: string;
    password: string;
}

export type IFirebaseUser = {
    id: string;
    name: string;
    email: string;
    department: string;
}

export type imageType = {
    file: File;
    url:string;
}

export type IProject = {
    title: string;
    description: string;
    imgFiles: imageType[];
    authorId: string;
}

export type IReturedProject = {
    authorName: string;
    authorDepartment: string;
    title?: string;
    imgFiles?: string[];
    timeStamp?: Date;
    description?: string;
}

export type IReturn = {
    data: IReturedProject[];
    currentPage: number;
    nextPage: number | null;
}