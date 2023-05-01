import React, {useEffect, useState} from 'react';
import './СoncernItem.css';
const ConcernItem = (props) => {
    const [value, setValue] = useState();
    const [concernsArr, setConcernsArr] = useState([]);

    const options = concernsArr.map((text, index) => {
        return <option key={text} value={text}>{text}</option>;
    });

    const handleChange = (event) => {
        setValue(event.target.value)
        props.onChange(event.target.value) // callback-функция
    }

    useEffect(() => {
        const concerns = new Set();
        if (props.data) {
            props.data?.forEach(v => concerns.add(v.concern.name));
            setConcernsArr(Array.from(concerns));
        }
    }, [props.data])

    return (
        <div className={"concernItem"}>
            <h3>Выбери концерн:</h3>
            <select value={value} onChange={(event) => handleChange(event)}>
                {options}
            </select>
        </div>)
};

export default ConcernItem;