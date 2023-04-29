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

    const [concernsData, setConcernsData] = useState()
    const [brandData, setBrandData] = useState()
    const [modelData, setModelData] = useState()

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

    const onChangeConcern = (e) => {
        setConcern(e.target.value)
        fetch('http://localhost:8080/car/concerns', {
            method: 'POST',
            //mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:3000',
            },
            body: "{\"pattern\":\"" + e.target.value + "\"}"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.response) {
                console.log(data.response);
                setConcernsData(data.response)
            }
        });
    }

    const onChangeBrand = (e) => {
        setBrand(e.target.value)
        fetch('http://localhost:8080/car/brands', {
            method: 'POST',
            //mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:3000',
            },
            body: "{\"concern\" : \"" + concern + "\"," +
                "\"pattern\":\"" + e.target.value + "\"}"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.response) {
                console.log(data.response);
                setBrandData(data.response)
            }
        });

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

            <input type="text" list="concerns" onChange={onChangeConcern} placeholder={"Укажи концерн:"}/>
            <datalist id="concerns">
                {
                    concernsData?.map((item, key) =>
                        <option key={key} value={item} onChange={onChangeConcern}/>
                    )}
            </datalist>

            <input className={'input'} list="brands" type={"text"} onChange={onChangeBrand}
                   placeholder={"Укажи выбери бренд:"}/>
            <datalist id="brands">
                {brandData?.map((item, key) =>
                    <option key={key} value={item} onChange={onChangeConcern}/>
                )}
            </datalist>

            <input className={'input'} list="models" type={"text"} onChange={onChangeModel}
                   placeholder={"Укажи выбери модель:"}/>
            <datalist id="models">
                {modelData.map((item, key) =>
                    <option key={key} value={item} onChange={onChangeConcern}/>
                )}
            </datalist>

            <input className={'input'} type={"text"} onChange={onChangePrice} placeholder={"Укажи цену:"}/>
            <input className={'input'} type={"text"} onChange={onChangeDescription} placeholder={"Напиши описание"}/>
        </div>
    );
};

export default Sale;