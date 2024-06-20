import React, { useState } from 'react'
import FileUploader from '../components/FileUploader'
import { Button } from '@/components/ui/button'
import { IProject, imageType } from '@/types'
import { useCreateProject } from '@/lib/react-query/query&mutations'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { useGlobalContext } from '@/context/GlobalContext'

const CreateProject = () => {

  const {user} = useGlobalContext()
  
  const [imgFiles, setImgFiles] = useState<Array<imageType>>([])

  const [projectDetails, setProjectDetails] = useState<IProject>({
    title: "",
    description: "",
    imgFiles,
    authorId: "",
  })

  const {
    mutateAsync: createProject,
    isPending
  } = useCreateProject()

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()

    if(imgFiles.length == 0){
      return toast({
        title: "Missing field",
        description: "Project images is required"
      })
    }

    const data = {...projectDetails, authorId: user.id, imgFiles}

    const result = await createProject(data)

    if(!result){
      return toast({
        title: "Error",
        description: "Something went wrong. try again later"
      })
    }

    return toast({
      title: "Success",
      description: "Project Created"
    })
  }

  return (
    <>
      <form className='max-w-6xl rounded space-y-4 px-4 py-2 mx-auto bg-white' onSubmit={handleSubmit}>
        <div className='space-y-3'>
          <label htmlFor="project-title" className='text-md font-bold'>Project Title*</label><br />
          <input 
            name='project-title' 
            type="text" 
            id='project-title'
            required
            className='w-full h-[40px] outline-none border px-2'
            placeholder='Design & Implementation of ........'
            onChange={(e) => setProjectDetails({...projectDetails, title: e.target.value})}
          />
        </div>
        <div className='space-y-3'>
          <label htmlFor="project-description" className='text-md font-bold'>Project Description*</label><br />
          <textarea 
            name='project-description'  
            id='project-description'
            required
            className='w-full h-[100px] outline-none border px-2 py-2'
            placeholder='About your project'
            onChange={(e) => setProjectDetails({...projectDetails, description: e.target.value})}
          />
        </div>
        <div className='space-y-3'>
          <label htmlFor="appendix" className='text-md font-bold'>Project Images*</label><br />
          <FileUploader imgFiles={imgFiles} setImgFiles={setImgFiles} />
        </div>
        <div className='flex gap-2 float-right'>
          <Button type='button' className='bg-slate-600'>Cancel</Button>
          <Button type='submit'>{isPending ? <Loader2 className='animate-spin' /> : "Submit"}</Button>
        </div>
        <div className='clear-both' />
      </form>
    </>
  )
}

export default CreateProject