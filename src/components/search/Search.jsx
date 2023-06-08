import React, {useCallback, useEffect, useState} from 'react';
import './Search.css';
import {useTelegram} from "../../hooks/useTelegram.js";
import Car from "../car/Car.jsx";
import Description from "../description/Description.jsx";

const Search = () => {
    const [cars, setCars] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')


    const handleCars = (e) => {
        setCars(e)
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
            cars,
            price,
            description,
            action: "SEARCH"
        }
        tg.sendData(JSON.stringify(data));
    }, [cars, price, description])

    useEffect(() => {
        tg.onEvent("mainButtonClicked", onSendData)
        return () => {
            tg.offEvent("mainButtonClicked", onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Отправить"
        })
    }, [])


//Валидация кнопки
    useEffect(() => {
        if (!description) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }

    }, [description])

    return (
        <div className={"search"}>
            <h3>Заявка поиск запчасти:</h3>
            <Description needPrice={false} handlePrice={handlePrice} handleDescription={handleDescription}/>
            <h4>Можешь заполнить конкретный автомобиль, на который нужна деталь.</h4>
            <Car handleCars={handleCars}/>
        </div>
    );
};

export default Search;