import React, {useCallback, useEffect, useState} from 'react';
import './Sale.css';
import {useTelegram} from "../../hooks/useTelegram.js";
import Car from "../car/Car.jsx";
import Description from "../description/Description.jsx";

const Sale = () => {
    const [carId, setCarId] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const handlePrice = (e) => {
        setPrice(e)
    }
    const handleDescription = (e) => {
        setDescription(e)
    }

    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            carId,
            price,
            description,
            action: "SALE"
        }
        tg.sendData(JSON.stringify(data));
    }, [carId, price, description])

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

    const handleCarId = (e) => {
        setCarId(e)
    }
    //Валидация кнопки
    useEffect(() => {
        if (!price || !description || !carId) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }

    }, [carId, price, description])

    return (
        <div className={"sale"}>
            <h3>Заявка на продажу заппчасти:</h3>
            <Car handleCarId={handleCarId}/>
            <Description handlePrice={handlePrice} handleDescription={handleDescription}/>
        </div>
    );
};

export default Sale;