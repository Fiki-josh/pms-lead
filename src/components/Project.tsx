import { IReturedProject } from '@/types'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

type IProps = {
    project: IReturedProject
}
const Project = ({project}: IProps) => {
  return (
    <div className='space-y-3 shadow rounded border w-full lg:w-[70%] px-10 py-4 bg-white'>
        <h1 className = "font-bold text-md">{project?.title}</h1>
        <h1 className = "font-bold text-md">Student Name: {project.authorName}</h1>
        <h1 className = "font-bold text-md">Department: {project.authorDepartment}</h1>

        <Carousel className='w-[90%] mx-auto'>
                <CarouselContent>
                    {
                        project?.imgFiles?.map((url, index) => (
                            <CarouselItem key={index} className=' mx-auto md:w-[50%] mt-2'>
                                <img src={url} alt="appendix image" className='w-full mx-auto h-auto' />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                {
                    (project.imgFiles && project.imgFiles.length > 1)
                    &&
                    (
                        <>
                            <CarouselPrevious className='bg-slate-400 ml-8 md:ml-0' />
                            <CarouselNext className='bg-slate-400 mr-8 md:mr-0' />
                        </>
                    ) 
                }
        </Carousel>
        <p>{project?.description}</p>
        {
            project.document && 
            <Link to={project?.document} target='_blank'>
                <Button type='button' className='mt-3'>View documentation</Button>
            </Link>
        }
    </div>
  )
}

export default Project