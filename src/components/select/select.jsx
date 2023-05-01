import React, {useEffect, useState} from 'react';
import './select.css'


/*
* props.values
* props.onChange(value)
* props.label
* */
const Select = (props) => {
    const [value, setValue] = useState();
    const [values, setValues] = useState([]);

    const options = values?.map((text, index) => {
        return <option key={text} value={text}>{text}</option>;
    });

    useEffect(() => {
        setValues(props.values)
    },[props])
    const handleChange = (value) => {
        setValue(value)
        props.onChange(value) // callback-функция
    }
    return (
        <div className={"select"}>
            <h3>{props.label}</h3>
            <select value={value} onChange={(event) => handleChange(event.target.value)}>
                {options}
            </select>
        </div>
    );
};

export default Select;