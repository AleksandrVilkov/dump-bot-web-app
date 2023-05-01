import React, {useCallback, useEffect, useState} from 'react';
import './Sale.css';
import {useTelegram} from "../../hooks/useTelegram.js";
import ConcernItem from "../items/concernItem/СoncernItem.jsx";
import BrandItem from "../items/brandItem/BrandItem.jsx";
import ModelItem from "../items/modelItem/ModelItem.jsx";
import CarItem from "../items/carItem/CarItem.jsx";

const Sale = () => {
    const [data, setData] = useState('')

    const fetchData = () => {
        fetch('http://localhost:8080/car/allCars', {
            method: 'GET',
            //mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:3000',
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setData(data.response)
        });
    }

    useEffect(() => {
        fetchData();
    }, [])


    // const concernData = [
    //     "PSA"
    // ]
    // const brandData = [
    //     "PEUGEOT", "CITROEN"
    // ]
    //
    // const modelData = [
    //     "C4", "307"
    // ]
    //
    // const [concern, setConcern] = useState('')


    //
    // const [price, setPrice] = useState('')
    // const [description, setDescription] = useState('')
    // const {tg} = useTelegram()
    //
    //
    //
    // const onSendData = useCallback(() => {
    //     const data = {
    //         concern,
    //         brand,
    //         model,
    //         price,
    //         description,
    //         action: "SALE"
    //     }
    //     tg.sendData(JSON.stringify(data));
    // }, [concern, brand, model, engine, price, description])
    //
    // useEffect(() => {
    //     tg.onEvent("mainButtonClicked", onSendData)
    //     return () => {
    //         tg.offEvent("mainButtonClicked", onSendData)
    //     }
    // }, [onSendData])
    //
    // useEffect(() => {
    //     tg.MainButton.setParams({
    //         text: "Продать"
    //     })
    // }, [])
    //
    // //Валидация кнопки
    // useEffect(() => {
    //     if (!price || !description) {
    //         tg.MainButton.hide();
    //     } else {
    //         tg.MainButton.show();
    //     }
    //
    // }, [price, description])
    //
    let updateData;
    updateData = (value) => {
        this.setState({name: value})
    }

    const [concern, setConcern] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [car, setCar] = useState('')
    const handleConcern = (concern) => {
        setConcern(concern)
        setBrand(null)
        setModel(null)
    }
    const handleBrand = (e) => {
        setBrand(e)
        setModel(null)
    }

    const handleModel = (e) => {
        setModel(e)
    }
    const handleCar = (e) => {
        setCar(e)
    }
    return (
        <div className={"sale"}>
            <h3>Ты находишься на страничке создания объявления</h3>
            <h3>Ты выбрал следующие данные: {concern} {brand} {model}</h3>
            <ConcernItem data={data} onChange={handleConcern}/>
            <BrandItem concern={concern} data={data} onChange={handleBrand}/>
            <ModelItem concern={concern} data={data} brand={brand} onChange={handleModel}/>
            <CarItem concern={concern} data={data} brand={brand} model={model} onChange={handleCar}/>
        </div>
    );
};

export default Sale;