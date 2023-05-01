import React, {useEffect, useState} from 'react';
import './BrandItem.css';

const BrandItem = (props) => {
    const [value, setValue] = useState('')
    const [brandsArr, setBrandsArr] = useState([]);

    const options = brandsArr.map((text, index) => {
        return <option key={text} value={text}>{text}</option>;
    });

    useEffect(() => {
        const brands = new Set();
        if (props.data) {
            props.data.forEach(e => {
                if (e.concern.name === props.concern) {
                    brands.add(e.brand.name)
                }
            })
        }
        setBrandsArr(Array.from(brands))
        if (!value) {
            handleChange(brandsArr[0])
        }
    }, [props])
    const handleChange = (value) => {
        setValue(value)
        props.onChange(value) // callback-функция
    }

    return (
        <div className={"brandItem"}>
            <h3>Выбери бренд:</h3>
            <select value={value} onChange={event => handleChange(event.target.value)}>
                {options}
            </select>
        </div>
    );
};

export default BrandItem;