import React, {useCallback, useEffect, useState} from 'react';
import './Search.css';
import {useTelegram} from "../../hooks/useTelegram.js";

const Search = () => {
    const {tg} = useTelegram()
    const [concern, setConcern] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [engine, setEngine] = useState('')
    const [description, setDescription] = useState('')


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
    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const onSendData = useCallback(() => {
        const data = {
            concern,
            brand,
            model,
            engine,
            description
        }
        tg.sendData(JSON.stringify(data));
    }, [concern, brand, model, engine, description])

    useEffect(() => {
        tg.onEvent("mainButtonClicked", onSendData)
        return () => {
            tg.offEvent("mainButtonClicked", onSendData)
        }
    },[onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Отправить"
        })
    })

    //Валидация кнопки
    useEffect(() => {
        if (!description) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }

    }, [description])

    return (
        <div className={"registration"}>
            <h3>Ты находишься на страничке создания запроса на поиск деталей</h3>
            <input className={'input'} type={"text"} onChange={onChangeConcern} placeholder={"Укажи концерн:"}/>
            <input className={'input'} type={"text"} onChange={onChangeBrand} placeholder={"Укажи выбери бренд:"}/>
            <input className={'input'} type={"text"} onChange={onChangeModel} placeholder={"Укажи выбери модель:"}/>
            <input className={'input'} type={"text"} onChange={onChangeEngine} placeholder={"Выбери мотор:"}/>
            <input className={'input'} type={"text"} onChange={onChangeDescription}
                   placeholder={"Напиши что именно ты ищешь:"}/>
        </div>
    );
};

export default Search;