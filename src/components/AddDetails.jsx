import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {useMutation,useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const AddDetails = () => {
    //no need if on change event if you are using react hoook form
    //register is also and object which keep appending details once automatically,so use {...register()} with inputs spread operator
    const {handleSubmit,register,reset}=useForm()
    const [posts, setPosts] = useState({});
    const handleSubmitData=(productdata)=>{
        console.log(productdata)
          setPosts(prev=>prev=productdata);//this usstate works Asynchronously so might be empty
        console.log(posts) //donot use state in such scinarios
        //here call the mutate funtion mutate() or its alias name if you ahev given any ,i have given
        postdata(productdata);//this will  pic parameters,pass form data directly not with state
          reset();
    }
    //for post update del you need query client obj
    const queryClient = useQueryClient();
    //now call the api with seperate fuction to make it modular
    const addPosts=async(productdata)=>{
        const add=await axios.post("http://localhost:4000/posts",productdata)
    }
    //use mutations
    //give alias name for mutate if you want
    //next call the mutate function
    const {mutate:postdata,isSuccess,isError,error}=useMutation({
        //remeber to call mutate function in hadnle submit to trigger post api
      mutationFn:addPosts,
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]); // Matches default state in `Posts`
        },
    });

    return (
        <div className="bg-slate-800 flex items-center justify-center w-screen h-screen bg-gradient-to-br from-30% from-violet-500 to-80% to-sky-500">
            <form className="flex flex-col w-[16rem] bg-white/45 gap-5 p-4 rounded-md shadow-sm shadow-black backdrop-blur-md"
                  onSubmit={handleSubmit(handleSubmitData)}> {/*//the data will be automatically passed by react hook for the fuction defined in handle submit*/}
                <h1 className="text-2xl font-bold text-lg textstroke">Add Details</h1>
                <input className="p-1 outline-2 outline-violet-400 rounded-md backdrop-blur-sm bg-white/30" placeholder="Enter title" {...register('title')} type="text"/>
                <input className="p-1 outline-2 outline-violet-400 rounded-md backdrop-blur-sm bg-white/30" placeholder="Enter price" {...register('price')} type="text"/>
                <input className="p-1 outline-2 outline-violet-400 rounded-md backdrop-blur-sm bg-white/30" placeholder="Enter decription" {...register('description')} type="text"/>
                <input className="p-1 outline-2 outline-violet-400 rounded-md backdrop-blur-sm bg-white/30" placeholder="Enter category" {...register('category')} type="text"/>
                <input className="p-1 outline-2 outline-violet-400 rounded-md backdrop-blur-sm bg-white/30" placeholder="Enter imageUrl" {...register('image')} type="text"/>
                <button type="submit" className="bg-gradient-to-r from-blue-500 to-sky-400 text-white py-2 px-4 rounded shine textstroke-light">
                    Submit
                </button>
            </form>
        </div>

    )
}
export default AddDetails
