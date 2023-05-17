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
            <h4>Если есть предел по цене, укажи, если нет - оставь поле пустым:</h4>
            <Description handlePrice={handlePrice} handleDescription={handleDescription}/>
            <h4>Можешь заполнить конкретный автомобиль, на который нужна деталь.</h4>
            <h4>Если заполняешь - нужно выбрать все поля.</h4>
            <h4>Иначе будет считаться что ничего не заполнено</h4>
            <Car handleCarId={handleCarId}/>
        </div>
    );
};

export default Search;