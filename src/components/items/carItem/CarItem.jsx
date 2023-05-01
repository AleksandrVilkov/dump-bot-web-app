import './CarItem.css';
import React, {useEffect, useState} from 'react';

const CarItem = (props) => {
    const [value, setValue] = useState();
    const [carArr, setCarArr] = useState([]);

    const options = carArr.map((text, index) => {
        return <option key={text} value={text}>{text}</option>;
    });

    const handleChange = (value) => {
        setValue(value)
        props.onChange(value) // callback-функция
    }

    useEffect(() => {
        console.log(props)
        const cars = new Set();
        if (props.data) {
            props.data?.forEach(e => {
                if (e.concern.name === props.concern &&
                    e.brand.name === props.brand &&
                    e.model.name === props.model) {
                    cars.add(e)
                }
            });
            setCarArr(Array.from(cars));
            if (!value) {
                handleChange(cars[0])
            }
        }
    }, [props])

    return (
        <div className={"carItem"}>
            <h3>Выбери конфигурацию:</h3>
            <select value={value} onChange={(event) => handleChange(event.target.value)}>
                {options}
            </select>
        </div>
    );
};

export default CarItem;