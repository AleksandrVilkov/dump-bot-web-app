import React, {useCallback, useEffect, useState} from 'react';
import './Sale.css';
import {useTelegram} from "../../hooks/useTelegram.js";
import Car from "../car/Car.jsx";
import Description from "../description/Description.jsx";

const Sale = () => {
    const [concern, setConcern] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [engine, setEngine] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const handleConcern = (concern) => {
        setConcern(concern);
    }

    const handleBrand = (e) => {
        setBrand(e)
    }

    const handleModel = (e) => {
        setModel(e)
    }
    const handleEngine = (e) => {
        setEngine(e)
    }

    const handlePrice = (e) => {
        setPrice(e)
    }
    const handleDescription = (e) => {
        setDescription(e)
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
            <h3>Заявка на продажу заппчасти:</h3>
            <Car handleConcern={handleConcern}
                 handleBrand={handleBrand}
                 handleModel={handleModel}
                 handleEngine={handleEngine}/>
            <Description handlePrice={handlePrice} handleDescription={handleDescription}/>
        </div>
    );
};

export default Sale;