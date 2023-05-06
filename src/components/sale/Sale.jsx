import React, {useCallback, useEffect, useState} from 'react';
import './Sale.css';
import {useTelegram} from "../../hooks/useTelegram.js";
import Car from "../car/Car.jsx";

const Sale = () => {
    const [concern, setConcern] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [engine, setEngine] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const handleConcern = (concern) => {
        setConcern("concern")
    }

    const handleBrand = (e) => {
        setBrand(e.target.value)
        setModel(null)
        setEngine(null)
    }

    const handleModel = (e) => {
        setModel("model")
    }
    const handleEngine = (e) => {
        setEngine(e)
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            concern,
            brand,
            model,
            engine,
            price,
            description,
            action: "SALE"
        }
        tg.sendData(JSON.stringify(data));
    }, [concern, brand, model, engine, price, description])

    useEffect(() => {
        tg.onEvent("mainButtonClicked", onSendData)
        return () => {
            tg.offEvent("mainButtonClicked", onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Продать"
        })
    }, [])


//Валидация кнопки
    useEffect(() => {
        if (!price || !description) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }

    }, [price, description])

    return (
        <div className={"sale"}>
            <h3>Ты находишься на страничке создания объявления</h3>
            <h3>Ты выбрал следующие данные: {concern} {brand} {model} {engine}</h3>
            <Car>handleConcern = {handleConcern}
                handleBrand= {handleBrand}
                handleModel = {handleModel}
                handleEngine = {handleEngine}</Car>

            <h3>Укажи цену:</h3>
            <input
                className={'input'}
                type={"text"}
                placeholder={"Укажи цену"}
                value={price}
                onChange={handlePrice}
            />

            <input
                className={'input'}
                type={"text"}
                placeholder={"Добавь описание:"}
                value={description}
                onChange={handleDescription}
            />
        </div>
    );
};

export default Sale;
//TODO обрабатывать колбеки