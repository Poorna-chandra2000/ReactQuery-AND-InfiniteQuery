import React from 'react'

const Card = (props) => {
    return (

            <div
                className="border-2 -tracking-wide p-1 font-pacifico text-black bg-blend-hard-light tracking-wider h-[20rem] rounded-md mt-2 mx-0.5 w-[14rem] flex flex-col justify-between text-sm">
                <h1 className="text-center mb-1">{props.title}</h1>
                <img className="rounded-md max-h-[10rem] w-fit self-center" src={props.image}
                     alt={props.image}/>
                <div className="flex items-center justify-between">
                    {/*<h2 className="text-center mb-1 flex justify-items-start font-poppins text-xs px-1 bg-green-800 w-fit mt-1 rounded-sm font-bold text-white">⭐:{props.rating.rate}</h2>*/}
                    <h2 className="text-center mb-1 flex justify-items-start font-poppins text-xs px-1 bg-green-800 w-fit mt-1 rounded-sm font-bold text-white">$:{props.price}</h2>
                </div>

            </div>

    )
}
export default Card
