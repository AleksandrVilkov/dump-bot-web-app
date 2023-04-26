import React, {useCallback, useEffect, useState} from 'react';
import './Sale.css';
import {useTelegram} from "../../hooks/useTelegram.js";

const Sale = () => {
    const [concern, setConcern] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [engine, setEngine] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            concern,
            brand,
            model,
            engine,
            price,
            description
        }
        fetch('http://localhost:8080/car/concerns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [concern, brand, model, engine, price, description])

    useEffect(() => {
        tg.onEvent("SaleButtonClicked", onSendData)
        return () => {
            tg.offEvent("SaleButtonClicked", onSendData)
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


    const onChangeConcern = (e) => {
        setConcern(e.target.value)
    }
    const onChangeBrand = (e) => {
        setBrand(e.target.value)
    }
    const onChangeModel = (e) => {
        setModel(e.target.value)
    }
    const onChangeEngine = (e) => {
        setEngine(e.target.value)
    }
    const onChangePrice = (e) => {
        setPrice(e.target.value)
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }


    return (
        <div className={"registration"}>
            <h3>Ты находишься на страничке создания объявления</h3>
            <input className={'input'} type={"text"} onChange={onChangeConcern} placeholder={"Укажи концерн:"}/>
            <input className={'input'} type={"text"} onChange={onChangeBrand} placeholder={"Укажи выбери бренд:"}/>
            <input className={'input'} type={"text"} onChange={onChangeModel} placeholder={"Укажи выбери модель:"}/>
            <input className={'input'} type={"text"} onChange={onChangeEngine} placeholder={"Выбери мотор:"}/>
            <input className={'input'} type={"text"} onChange={onChangePrice} placeholder={"Укажи цену:"}/>
            <input className={'input'} type={"text"} onChange={onChangeDescription} placeholder={"Напиши описание"}/>
        </div>
    );
};

export default Sale;