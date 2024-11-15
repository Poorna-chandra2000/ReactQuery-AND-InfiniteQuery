import React from 'react'

const Button = (props) => {
    return (
        <button className="text-left font-poppins text-xs bg-slate-800 pl-1 pr-1 rounded-r-2xl opacity-60 text-white font-semibold" onClick={props.onClick}>{props.cate}</button>
    )
}
export default Button
