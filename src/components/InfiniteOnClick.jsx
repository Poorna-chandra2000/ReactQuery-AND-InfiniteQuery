import React from 'react'
import axios from "axios";
import {useInfiniteQuery} from "@tanstack/react-query";//important-------------------------------
import LoadingAnim from "./LoadingAnim.jsx";

const InfiniteOnClick = () => {

    const fetchFruits=async({pageParam})=>{
        const url = `/api/fruits?_page=${pageParam}&_per_page=5`;
        const response= await axios.get(url);
      return response.data;
    }

//destrucre fetchNextPage function and hasNextPage-boolen from useInfinite query hook----------------------------------------------
    //invoke or call the FectchNextPage on click as below in the button
    const {data,isLoading,isError,error,fetchNextPage,hasNextPage}=useInfiniteQuery({
        //fetchNextPage function is important
        queryKey: ["fruits"],
        queryFn: fetchFruits,
        initialPageParam: 1, //important for initial page
        //to get next page use this inbuild object and set the bounderies,on edgecase the
        //hasnext becomes false which will diable the button and fetching
        getNextPageParam: (_lastPage,allPages)=>{
            if (allPages.length<6){

                return allPages.length+1;
            }else {
                return undefined;
            }
        } //this is to handle edge cases
    })
//-------------------------------------------------------------------------------------------------------------------------------
    if(isLoading)return <LoadingAnim />;

    if (isError) return <h1>{error.message}</h1>;


    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 overflow-x-hidden px-4 pb-5">
            <h1 className="bg-clip-text text-transparent
            bg-gradient-to-r from-blue-700 via-sky-900 backdrop-blur-md fixed top-3 z-10 opacity-40
            to-violet-800 text-4xl mt-2 font-[900]
            ">
                FRUITS
            </h1>
            {
              data?.pages?.map((page)=>{
                  return isLoading?<LoadingAnim/>:
                      page?.data.map(fruit=>{
                      return <div key={fruit.id}
                      className="mx-2 my-1 p-2 rounded-md backdrop-blur-md bg-white/30 w-full bg-gradient-to-r from-blue-500 via-blue-50  to-violet-800 text-center bg-opacity-0">
                          {fruit.name}
                         </div>})
              })
            }
            {/*has next page propery from useinfinitequery when getNextPage boundery hits ,hasnextpage is set to false and disables---------------------------------------------*/}
           <button onClick={fetchNextPage} disabled={!hasNextPage}
            className="p-1 text-xl font-poppins flex items-center justify-center bg-gradient-to-r mt-2 from-pink-500 from-10% via-blue-500 to-violet-800 text-white rounded-full" >
               {
                   hasNextPage===false?
                       <span>No more Fruits</span> :<>  <LoadingAnim />
                   Load more</>
               }


            </button>
        </div>
    )
}
export default InfiniteOnClick
