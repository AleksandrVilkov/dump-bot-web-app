import React, {useCallback, useEffect, useState} from 'react';
import './Search.css';
import {useTelegram} from "../../hooks/useTelegram.js";
import Car from "../car/Car.jsx";
import Description from "../description/Description.jsx";

const Search = () => {
    const [carId, setCarId] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')


    const handleCarId = (e) => {
        setCarId(e)
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
            carId,
            price,
            description,
            action: "SEARCH"
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


//Валидация кнопки
    useEffect(() => {
        if (!price || !description) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }

    }, [price, description])

    return (
        <div className={"search"}>
            <h3>Заявка поиск запчасти:</h3>
            <Car handleCarId={handleCarId}/>
            <h3>Если есть предел по цене, укажи, если нет - оставь поле пустым:</h3>
            <Description handlePrice={handlePrice} handleDescription={handleDescription}/>
        </div>
    );
};

export default Search;