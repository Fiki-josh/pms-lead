import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { imageType } from '@/types'
import { Plus } from 'lucide-react'

const FileUploader = ({imgFiles, setImgFiles}: {imgFiles: imageType[], setImgFiles: React.Dispatch<React.SetStateAction<imageType[]>>}) => {

    function handleImgUpload(e: React.ChangeEvent<HTMLInputElement>){
        console.log("Testing 1")
        if(e.target.files){
            const url = URL.createObjectURL(e.target.files[0])
            console.log("Testing 2")

            imgFiles
            ?
            setImgFiles([
                ...imgFiles, {file: e.target.files[0], url}
            ])
            :
            setImgFiles([
                {file: e.target.files[0], url}
            ])
            console.log(imgFiles)
        }
    }
  return (
    <div className='w-full border'>
        {
            !imgFiles?.length
            ?
            <section className='space-y-3 w-full flex flex-col items-center py-6'>
                <img 
                    src="/images/file-upload.svg" 
                    alt="File upload image" 
                    className='w-[120px] h-[120px]'
                />
                <h1 className='font-bold text-md'>Click button to upload an image</h1>
                <label htmlFor="appendix" className='bg-black justify-center w-[100px] h-[40px] text-center flex items-center ju text-white rounded'>
                    Upload
                </label>
                <input 
                    id='appendix'
                    type="file" 
                    accept='image/jpg, image/svg, image/jpeg, image/png'
                    className='hidden'
                    onChange={handleImgUpload}
                />
            </section>
            :
            <Carousel className='w-[80%] mx-auto py-3'>
                <label htmlFor="appendix-after" className='bg-black cursor-pointer float-right justify-center w-[30px] h-[30px] text-center flex items-center text-white rounded'>
                    <Plus color='white' />
                </label><br />
                <input 
                    id='appendix-after'
                    type="file" 
                    accept='image/jpg, image/svg, image/jpeg, image/png'
                    className='hidden'
                    onChange={handleImgUpload}
                />
                <div className='clear-both' />
                <CarouselContent>
                    {
                        imgFiles?.map((img) => (
                            <CarouselItem key={img.url} className=' mx-auto md:w-full mt-2'>
                                <img src={img.url} alt="appendix image" className='w-[90%] mx-auto md:w-full h-auto' />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className='bg-slate-400 ml-3 md:ml-0' />
                <CarouselNext className='bg-slate-400 mr-3 md:mr-0' />
            </Carousel>
        }
    </div>
  )
}

export default FileUploader