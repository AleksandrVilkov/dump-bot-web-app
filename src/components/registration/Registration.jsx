import React, {useCallback, useEffect, useState} from 'react';
import './Registration.css';
import Select from "../select/select.jsx";
import {useTelegram} from "../../hooks/useTelegram.js";

const Registration = () => {
    const [data, setData] = useState('')

    const [concern, setConcern] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [engine, setEngine] = useState('')

    const [concernsArr, setConcernsArr] = useState([]);
    const [brandsArr, setBrandsArr] = useState([]);
    const [modelsArr, setModelArr] = useState([]);
    const [enginesArr, setEnginesArr] = useState([]);
    const [countriesArr, setCountriesArr] = useState([]);

    const fetchData = () => {
        fetch('http://85.193.82.129/car/allCars', {
            method: 'GET',
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
        fetch('http://localhost:8080/place/countries', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:3000',
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setCountriesArr(data.response)
        });
    }

    useEffect(() => {
        fetchData();
    }, [])


    useEffect(() => {
        if (data) {
            const concerns = new Set();
            data.forEach(v => concerns.add(v.concern.name));
            setConcernsArr(Array.from(concerns));
            if (!concern) {
                setConcern(concernsArr[0])
            }
        }
    }, [data])

    useEffect(() => {
        if (data && concern) {
            const brands = new Set();
            data.forEach(v => {
                if (v.concern.name === concern) {
                    brands.add(v.brand.name)
                }
            })
            setBrandsArr(Array.from(brands));
        }
    }, [data, concern])

    useEffect(() => {
        if (data && concern && brand) {
            const models = new Set();
            data.forEach(e => {
                if (e.concern.name === concern && e.brand.name === brand) {
                    models.add(e.model.name)
                }
            })
            setModelArr(Array.from(models));
        }
    }, [data, brand])


    useEffect(() => {
        if (data && concern && brand && model) {
            const engines = new Set();
            data.forEach(e => {
                if (e.concern?.name === concern && e.brand?.name === brand && e.model?.name === model) {
                    engines.add(e.engine.name)
                }
            })
            setEnginesArr(Array.from(engines));
        }
    }, [data, model])


    const handleConcern = (concern) => {
        setConcern(concern)
        setBrand(null)
        setModel(null)
        setEngine(null)
    }

    const handleBrand = (e) => {
        setBrand(e)
        setModel(null)
        setEngine(null)
    }

    const handleModel = (e) => {
        setModel(e)
    }
    const handleEngine = (e) => {
        setEngine(e)
    }


    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            concern,
            brand,
            model,
            action: "SALE"
        }
        tg.sendData(JSON.stringify(data));
    }, [concern, brand, model, engine])

    useEffect(() => {
        tg.onEvent("mainButtonClicked", onSendData)
        return () => {
            tg.offEvent("mainButtonClicked", onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Зарегистрироваться"
        })
    }, [])

    return (
        <div className={"sale"}>
            <h3>Добро пожаловать! Давай пройдем простую регистрацию: </h3>
            <h3>Ты выбрал следующие данные: {concern} {brand} {model} {engine}</h3>
            <Select label={"Выбери концерн:"} values={concernsArr} onChange={handleConcern}/>
            <Select label={"Укажи бренд:"} values={brandsArr} onChange={handleBrand}/>
            <Select label={"Выбери модель:"} values={modelsArr} onChange={handleModel}/>
            <Select label={"Уточни данные:"} values={enginesArr} onChange={handleEngine}/>
            <Select label={"Выбери страну:"} values={countriesArr} onChange={handleEngine}/>
            <Select label={"Выбери город:"} values={countriesArr} onChange={handleEngine}/>
        </div>
    );
};

export default Registration;
