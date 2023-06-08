import React, {useEffect, useState} from 'react';
import './select.css'


/*
* props.values
* props.onChange(value)
* props.label
* */
const Select = (props) => {
    const [value, setValue] = useState(props.label);
    const [values, setValues] = useState([]);
    const options = [];
    options.push(<option key={0} value={props.label} disabled>{props.label}</option>);
    values?.forEach((text, index) => {
        options.push(<option key={text} defaultValue={text}>{text}</option>);
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
            <select value={value} onChange={(event) => handleChange(event.target.value)}>
                {options}
            </select>
        </div>
    );
};

export default Select;