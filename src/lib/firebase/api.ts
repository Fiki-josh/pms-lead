import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { INewUser, IProject, IReturn, ISignUser } from "../../types"
import { auth, db, storage } from "./config"
import { DocumentData, addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export async function createUserAccount (userData: INewUser){

    const userRef = collection(db, "users")

    try {
        const newUser = await createUserWithEmailAndPassword(
            auth, userData.email, userData.password
        )

        if(!newUser) throw new Error("Error creating user")

        const userOb = {
            id: newUser.user.uid,
            name: userData.name,
            email: userData.email,
            department: userData.department
        }

        await setDoc(doc(userRef, newUser.user.uid), userOb)

        return userOb
        
    } catch (error) {
        console.error(error)
    }
}
export async function signIntoAccount (data: ISignUser){
    try {
        const user = await signInWithEmailAndPassword(
            auth, data.email, data.password
        )

        if(!user) throw new Error("Error signing in user")

        return user;
        
    } catch (error) {
        console.error(error)
    }
}

export async function getCurrentUser(){

    const handlePromise: Promise<DocumentData | undefined> = new Promise((resolve, reject) => {
        auth.onAuthStateChanged(async (currentUser) => {
            
            if(currentUser){
                const usersRef = collection(db, "users")

                const userDoc = doc(usersRef, currentUser.uid)

                const userSnapShot = await getDoc(userDoc)

                if(!userSnapShot.exists) throw new Error("Error occurred while handling user session")
                
                const userData = userSnapShot.data()

                resolve(userData)
            }else{
                reject("No user")
            }
        })
    })

    try {
        const getUser = await handlePromise

        if(getUser) return getUser

        return null
    } catch (error) {
        console.error(error)
    }
}

export async function createProject(data: IProject){
    const projectsRef = collection(db, "projects")

    if(!data.document) return alert("Missing Field")

    try {
        let imgFiles: string[] = [];

        const handlePromise = new Promise((resolve) => {

            data.imgFiles.map(async (imgFile, index) => {
                const storageRef = ref(storage, `projects/${data.title}/${imgFile.file.name}` + new Date())

                const imgUpload = await uploadBytes(storageRef, imgFile.file)

                if(!imgUpload) throw new Error("Error occured while uploading image")
                
                const getUrl = await getDownloadURL(storageRef)

                if(!getUrl) throw new Error("Error occured while uploading image")


                imgFiles.push(getUrl) 

                if(data.imgFiles.length - 1 == index){
                    resolve(true)
                }

            })
        })

        await handlePromise

        const storageRef = ref(storage, `documentation/${data.document.name}/${data.authorId}` + new Date())

        const imgUrl = await uploadBytes(storageRef, data.document)

        if(!imgUrl) throw new Error("Error uploading documentstion")
        
        const getUrl = await getDownloadURL(storageRef)

        if(!getUrl) throw new Error("Error uploading documentstion")

        const uploadData = {
            title: data.title,
            authorId: data.authorId,
            description: data.description,
            imgFiles,
            document: getUrl,
            timeStamp: new Date()
        }

        const docData = await addDoc(projectsRef, uploadData)

        return docData
        
    } catch (error) {
        console.error(error)
    }
}

const LIMIT = 10

export async function getProjects(
    {pageParam}: {pageParam: number}
): Promise<IReturn | undefined>{
    const projectsRef = collection(db, "projects")

    const q = query(
        projectsRef,
        orderBy("timeStamp","desc"),
        limit(pageParam + LIMIT)
    )

    try {
        const querySnapshot = await getDocs(q)

        if(!querySnapshot) throw new Error("Error getting projects")
        
        const returnedResultPromise = querySnapshot.docs.map(async (data) => {
            const docData = data.data()
            
            const authorId: string = docData?.authorId

            const usersRef = collection(db, "users")

            const userDoc = doc(usersRef, authorId)

            const docSnapshot = await getDoc(userDoc)

            if(!docSnapshot.exists()) throw new Error("Error getting author")
            
            const authorName: string = docSnapshot.data().name

            const authorDepartment: string = docSnapshot.data().department

            return {...docData, authorName, authorDepartment}
        })        

        const returnedResult = await Promise.all(returnedResultPromise)
        return {
            data: returnedResult,
            currentPage: pageParam,
            nextPage: pageParam + LIMIT === returnedResult.length 
            ? 
            pageParam + LIMIT 
            : null
        }
    } catch (error) {
        console.error(error)
    }
}

export async function SignUserOut(){
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error)
    }
}