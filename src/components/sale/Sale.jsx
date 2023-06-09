import React, {useCallback, useEffect, useState} from 'react';
import './Sale.css';
import {useTelegram} from "../../hooks/useTelegram.js";
import Car from "../car/Car.jsx";
import Description from "../description/Description.jsx";

const Sale = () => {
    const [cars, setCars] = useState('')
    const [chooseCars, setChooseCars] = useState([])
    const [carsComponentCount, setCarsComponentCount] = useState(1)

    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const [arrCarComponent, setArrComponent] = useState([])
    const [printText, setPrintText] = useState("Выбрали")
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
            action: "SALE"
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
            text: "Продать"
        })
    }, [])

   //TODO запоминать выбранные авто из всех блоков, сколько бы их ни было
    const handleCars = (e) => {
        console.log("e length " + e.length)
        setCars(e)
        console.log("car length " + cars.length)
        let str = "Выбрано: \n"
        for (let i = 0; i < cars.length; i++) {
           str = str + cars[i].brand.name + " " +  cars[i].model.name
        }
        setPrintText(str)
    }

    //Валидация кнопки
    useEffect(() => {
        if (!price || !description || !cars) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }

    }, [cars, price, description])

    //Добавляем блоки с авто
    useEffect(() => {
        let arr = []
        for (let i = 0; i < carsComponentCount; i++) {
            arr.push(<Car handleCars={handleCars}/>)
        }
        setArrComponent(arr)
    }, [carsComponentCount])


    return (
        <div className={"sale"}>
            <h3>Заявка на продажу заппчасти:</h3>
            {arrCarComponent}
            <button onClick={() => {
                setCarsComponentCount(carsComponentCount+1)
            }}>Добавить авто</button>
            <br/>
            <button onClick={() => {
                let count = carsComponentCount -1
                if (count === 0) {
                    count = 1
                }
                setCarsComponentCount(count)
            }}>Удалить авто</button>
            <br/>
            <h5>{printText}</h5>
            <Description needPrice={true} handlePrice={handlePrice} handleDescription={handleDescription}/>
        </div>
    );
};

export default Sale;