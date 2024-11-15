import React from 'react'
import {Route, Routes} from "react-router-dom";
import ProductDetailPage from "./ProductDetailPage.jsx";
import Posts from "./Posts.jsx";
import AddDetails from "./AddDetails.jsx";
import FetchOnClick from "./FetchOnClick.jsx";
import InfiniteOnClick from "./InfiniteOnClick.jsx";
import InfiniteScrolling from "./InfiniteScrolling.jsx";
const NavRouter = () => {
    return (

            <Routes>
                <Route path="/" element={<Posts />}/>
                <Route path="/productDetails/:id" element={<ProductDetailPage />}/>
                <Route path="/OnClickFetch" element={<FetchOnClick />}/>
                <Route path="/MutationForPost" element={<AddDetails/>}/>
                <Route path="/InfiniteLoadingOnClick" element={<InfiniteOnClick />}/>
                <Route path="/InfiniteLoadingOnScroll" element={<InfiniteScrolling />}/>
            </Routes>

        //make sure to add Navrouter in app.jsx

    )
}
export default NavRouter
