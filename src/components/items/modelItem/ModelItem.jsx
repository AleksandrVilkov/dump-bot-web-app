import React, {useEffect, useState} from 'react';
import './ModelItem.css';
const ModelItem = (props) => {
    const [value, setValue] = useState('')
    const [modelArr, setModelArr] = useState([]);

    const options = modelArr.map((text, index) => {
        return <option key={text} value={text}>{text}</option>;
    });
    useEffect(() => {
        const model = new Set();
        if (props.data) {
            props.data.forEach(e => {
                if (e.concern.name === props.concern && e.brand.name === props.brand) {
                    model.add(e.model.name)
                }
            })
        }
        setModelArr(Array.from(model))
        if (!value) {
            handleChange(modelArr[0])
        }
    }, [props]);

    const handleChange = (value) => {
        setValue(value)
        props.onChange(value) // callback-функция
    }

    return (
        <div className={"modelItem"}>
            <h3>Выбери модель:</h3>
            <select value={value} onChange={event => handleChange(event.target.value)}>
                {options}
            </select>
        </div>
    );
};

export default ModelItem;