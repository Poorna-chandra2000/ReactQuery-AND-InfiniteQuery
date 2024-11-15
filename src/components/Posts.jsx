// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "./Card.jsx";
import Button from "./Button.jsx";
import {NavLink} from "react-router-dom";

const Posts = () => {
    const [singleProduct, setSingleProduct] = useState(0);
console.log(singleProduct);
    // Fetch posts based on the selected product
    const fetchPosts = async () => {
        const url = singleProduct !== 0
            ? `/api/posts?id=${singleProduct}`  // Single product URL
            : '/api/posts';                  // All products URL
        const response = await axios.get(url);
        return response.data;
    };

    // Fetch data using React Query
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["posts", singleProduct],//if you are trying to fetch single product then also metion that state
        queryFn: fetchPosts,
        //this is polling i.e refetching because data keeps changing or added
        //do this for websites which needs constent refech
         refetchInterval:1000,
        refetchIntervalInBackground: true
    });

    // Loading and Error handling
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    // const uniquecategory=new Set(data.map((product)=>product.category)); //this returns an array
    // //a set doesnt accept function as a parameter remeber that
    // //aslo remeber when you wanna use map on set make sure use spread operator
    // //ex: [...uniquecategory].map use this way,other wise use for loop
    //
    // console.log([...uniquecategory]);



    return (
        <div className="flex flex-wrap w-screen h-screen justify-center relative overflow-y-auto">
            <div className="flex flex-col left-0 top-8 gap-2 fixed">
                {[0,1].map((categ, index) => (
                    <Button key={index} cate={categ} onClick={() => {
                        console.log("Button clicked:", categ); // Check if button click is working
                        setSingleProduct(categ); // Set selected product ID
                    }} />
                ))}
            </div>

            {/* Render data based on whether it is an array or a single object */}
            {Array.isArray(data) ? (
                data.length > 0 ? (
                    data.map((post) => <NavLink key={post.id} to={`/productDetails/${post.id}`} ><Card key={post.id} {...post} /></NavLink>)
                ) : (
                    <h1>No products found</h1>
                )
            ) : (
                data ? <Card key={data.id} {...data} /> : <h1>No product found</h1>
            )}
        </div>
    );
};

export default Posts;
