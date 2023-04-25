import React, {useState} from 'react';
import './Registration.css';
import {useTelegram} from "../../hooks/useTelegram.js";

const Registration = () => {
    const {tg} = useTelegram()
    const [concern, setConcern] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [engine, setEngine] = useState('')
    const [boltPatten, setBoltPatten] = useState('')
    const [city, setCity] = useState('')

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
    const onChangeBoltPattern = (e) => {
        setBoltPatten(e.target.value)
    }
    const onChangeCity = (e) => {
        setCity(e.target.value)
    }


    return (
        <div className={"registration"}>
            <h3>Ты находишься на страничке регистрации</h3>
            <input className={'input'} type={"text"} onChange={onChangeConcern} placeholder={"Укажи концерн своего автомобиля"}/>
            <input className={'input'} type={"text"} onChange={onChangeBrand} placeholder={"Укажи выбери бренд:"}/>
            <input className={'input'} type={"text"} onChange={onChangeModel} placeholder={"Укажи выбери модель:"}/>
            <input className={'input'} type={"text"} onChange={onChangeEngine} placeholder={"Выбери мотор:"}/>
            <input className={'input'} type={"text"} onChange={onChangeBoltPattern} placeholder={"Какая разболтовка на твоих колесах?"}/>
            <input className={'input'} type={"text"} onChange={onChangeCity} placeholder={"Из какого ты города?"}/>
        </div>
    );
};

export default Registration;