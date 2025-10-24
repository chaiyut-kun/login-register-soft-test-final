import React, { type ChangeEvent } from 'react'
import type { InputGroupType } from '../types/inputGroup'

function InputGroup({ name, type, value, label, handleChange }: InputGroupType) {
    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
        handleChange(e.target.value);
        console.log(value)
    };

    return (
        <div className='mt-2'>
            <label htmlFor={name}>{label}</label>
            <div className='mt-1'>
                <input aria-label={name} onChange={handleChangeValue} name={name} value={value} type={type} className='rounded border border-white w-[100%] h-10 px-2 py-1' />
            </div>
        </div >
    )
}

export default InputGroup