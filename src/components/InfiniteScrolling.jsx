import React, {useEffect} from 'react'
import LoadingAnim from "./LoadingAnim.jsx";
import axios from "axios";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from "react-intersection-observer";


//step 1
//npm i react-intersection-observer install this first
//import useInView hook from react-intersection-observer
//step 3 destrcture its objects

const InfiniteScrolling = () => {

    const fetchFruits=async({pageParam})=>{
        const url=`http://localhost:4000/fruits?_page=${pageParam}&_per_page=5`
        const response= await axios.get(url);
        return response.data;
    }


    const {data,isLoading,isError,error,fetchNextPage,hasNextPage,isFetchingNextPage}=useInfiniteQuery({
        //fetchNextPage function is important
        queryKey: ["fruits"],
        queryFn: fetchFruits,
        initialPageParam: 1, //important
        getNextPageParam: (_lastPage,allPages)=>{
            if (allPages.length<6){

                return allPages.length+1;
            }else {
                return undefined;
            }
        } //this is to handle edge cases
    })

    //infinite scrolling
const {ref,inView,entry}=useInView()
    useEffect(() => {
        if(inView){
            fetchNextPage();
        }
    }, [fetchNextPage,inView]);

    if(isLoading)return <LoadingAnim />;

    if (isError) return <h1>{error.message}</h1>;


    return (
        <div
            className="w-screen h-screen flex flex-col justify-center items-center text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 overflow-x-hidden px-4 pb-5">
            <h1 className="bg-clip-text text-transparent
            bg-gradient-to-r from-blue-700 via-sky-900 backdrop-blur-md fixed top-3 z-10 opacity-40
            to-violet-800 text-4xl mt-2 font-[900]
            ">
                FRUITS
            </h1>
            {
                data?.pages?.map((page) => {
                    return isLoading ? <LoadingAnim/> :
                        page?.data.map(fruit => {
                            return <div key={fruit.id}
                                        className="mx-2 my-1 p-2 rounded-md backdrop-blur-md bg-white/30 w-[10em] h-[15em] bg-gradient-to-r from-blue-500 via-blue-50  to-violet-800 text-center bg-opacity-0">
                                {fruit.name}
                            </div>
                        })
                })
            }

            <div ref={ref}>{isFetchingNextPage && <LoadingAnim/>}</div>
        </div>

    )
}
export default InfiniteScrolling
