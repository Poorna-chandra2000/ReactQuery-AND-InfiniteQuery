import React from 'react'
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const ProductDetailPage = () => {
    const {id}=useParams() //extract id from url

    const fetchproductdata=async()=>{
        const response=await axios.get(`/api/posts/?id=${id}`);
        return response.data;
    }

    const {data,isError,isLoading,error}=useQuery({
        queryKey:["productId",id],
        queryFn: fetchproductdata
    });

   if(isLoading){
     return <h1>Loading...</h1>
   }else if(isError){
       return <h1>{error.message}</h1>
   }


    return (
        <div className="flex p-4 w-full h-screen items-center justify-center ">

            <div className="flex flex-wrap w-full h-[18rem] items-center justify-center  box-border m-0 p-0">
                <div
                    className="text-sm w-[14rem] text-center  flex flex-col h-full  justify-center items-center border-2 p-2">
                    <h1>{data.title}</h1>
                    <img className="h-[14rem] w-full" src={data.image} alt={data.title}/>
                </div>
                <div className="flex flex-col bg-red-100 gap-3 h-fit w-[20rem] items-center border-4 rounded-md p-2">
                    <h2 className="font-poppins first-letter:uppercase font-semibold break-words">{data.category}</h2>
                    <p className="font-poppins text-justify font-light text-sm break-words whitespace-normal">{data.description}</p>
                </div>
            </div>
        </div>
    )
}
export default ProductDetailPage

