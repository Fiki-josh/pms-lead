import { useEffect, useRef } from 'react'
import { useGetprojects } from '@/lib/react-query/query&mutations'
import { useElementInView } from '@/hooks/useElementInView'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Project from '@/components/Project'

const Feed = () => {

    const {
        data,
        isPending,
        fetchNextPage,
        isFetchingNextPage,
        isError,
        error
    } = useGetprojects()

    const myDivRef = useRef(null)

    const inView = useElementInView(myDivRef)

    const lastFetched = data?.pages[data.pages.length - 1]

    useEffect(() => {
        if(inView){
            fetchNextPage()
        }
    },[inView])
  return (
    <section className='max-w-6xl mx-auto'>
        {isPending && (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <Loader2 className="animate-spin" />
            </div>
        )}
        {isError && (
            <div className="w-full h-full flex flex-col justify-center items-center text-red-600">
                {error.message}
            </div>
        )}
        {lastFetched &&
        lastFetched.data.map((post, index: number) => {
            return (
                <div key={index} className="w-full space-y-8 lg:space-y-4 px-3">
                    <Project project={post} />
                </div>
            );
        })}
        {
          (!isPending && !isError && lastFetched?.data.length === 0) 
          && <p className="text-center flex gap-1">
            No feed project uploaed yet. Be the first to share your project by clicking here
            <Link to={"/create"} className = "underline text-blue-400">
                create
            </Link>
          </p>
        }
        <div
            ref={myDivRef}
            className="w-full flex flex-col justify-center items-center"
        >
            {isFetchingNextPage && <Loader2 className="animate-spin" />}
        </div>
    </section>
  )
}

export default Feed