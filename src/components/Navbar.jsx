import React, {useEffect, useState} from 'react'
import {NavLink} from "react-router-dom";
import downarrow from "../assets/img.png"

//isActive is an object make sure use curly braces to bound it
const Navbar = () => {

    const [open, setOpen] = useState(false); //u can alsoo do React.useState();
  //   <div
  //       className={`flex flex-col right-0 text-center resize gap-1 text-[0.7rem] bg-slate-800
  // transition-transform duration-1000 ease-in-out`}
  //       style={{transform: open ? 'translateY(-19em)' : 'translateY(4.3em)'}}>
  //   </div>

    // if(open){
    //     setTimeout(()=>{setOpen(prev => prev=false)}, 2000)
    // }
    // Handle the menu close after 2 seconds when opened
    useEffect(() => {
        if (open) {
            const timeout = setTimeout(() => {
                setOpen(false); // Close the menu after 2 seconds
            }, 2000);

        }

    }, [open]); // Only run when the `open` state changes

    return (
        <div className="flex flex-col fixed z-20 right-0 text-justify bg-slate-800 font-poppins p-2 text-sm gap-1 text-white
       ">
            <h1 className="self-center border-b-2 border-slate-500 w-full text-xl text-center font-pacifico relative z-30 bg-slate-800 w-full "
                onMouseOver={() => setOpen(!open)}>MENU</h1>
            <div



                className={`flex flex-col right-0 text-center  gap-1 text-[0.7rem] bg-slate-800
               overflow-hidden
               transition-all duration-1000 ease-in-out 
  ${open==false ? 'max-h-0' : 'max-h-[30rem]'}`}

            >
                <NavLink className={({isActive}) => `${isActive ? "bg-slate-600 font-semibold" : "bg-slate-800"}`}
                         to="/">AutoFetch</NavLink>
                <NavLink className={({isActive}) => `${isActive ? "bg-slate-600 font-semibold" : "bg-slate-800"}`}
                         to="/OnClickFetch">OnClickFetch</NavLink>
                <NavLink className={({isActive}) => `${isActive ? "bg-slate-600 font-semibold" : "bg-slate-800"}`}
                         to="/MutationForPost">MutationForPost</NavLink>
                <NavLink className={({isActive}) => `${isActive ? "bg-slate-600 font-semibold" : "bg-slate-800"}`}
                         to="/InfiniteLoadingOnClick">InfiniteLoading <br/> _OnClick</NavLink>
                <NavLink className={({isActive}) => `${isActive ? "bg-slate-600 font-semibold" : "bg-slate-800"}`}
                         to="/InfiniteLoadingOnScroll">InfiniteLoading <br/>_OnScroll</NavLink>
            </div>
            <div className={`w-full text-center transition-transform duration-1000
           ${open ? "rotate-180" : "rotate-0"}`}>
                <img src={downarrow} className="h-[0.7em]"/>
            </div>
        </div>

    )
}
export default Navbar
