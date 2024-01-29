import React from "react"
import { MdDone } from "react-icons/md";

const CardColor = ({ color, onClick, name, isActive }: any) => {
    return (
        <div className={`card-color ${isActive ? 'active' : ''}`} onClick={onClick}>
            {isActive && <i><MdDone /></i>}

            <img src={color} alt='img' />
            <span>{name}</span>
        </div>
    )
}

export default CardColor