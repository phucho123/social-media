import React from 'react'

const CustomBtn = ({ type, label, styles, onClick }) => {
    return (

        <button className={`inline-flex items-center text-base ${styles}`}
            onClick={onClick}
            type={type || "button"}
        >
            {label}
        </button>
    )
}

export default CustomBtn