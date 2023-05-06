import React, {useCallback, useEffect, useState} from 'react';
import './Registration.css';
import Select from "../select/select.jsx";
import {useTelegram} from "../../hooks/useTelegram.js";

const Registration = () => {
    const [carData, setCarData] = useState('')
    const [citiesData, setCitiesData] = useState('')
    const [concern, setConcern] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [engine, setEngine] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')

    const [concernsArr, setConcernsArr] = useState([]);
    const [brandsArr, setBrandsArr] = useState([]);
    const [modelsArr, setModelArr] = useState([]);
    const [enginesArr, setEnginesArr] = useState([]);
    const [countriesArr, setCountriesArr] = useState([]);
    const [citiesArr, setCitiesArr] = useState([]);
    const fetchData = () => {
        fetch('https://85.193.82.129/car/allCars', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setCarData(data.response)
        });

        fetch('https://85.193.82.129/place/cities', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setCitiesData(data.response)
        });

    }

    useEffect(() => {
        fetchData();
    }, [])


    useEffect(() => {
        if (carData) {
            const concerns = new Set();
            carData.forEach(v => concerns.add(v.concern.name));
            setConcernsArr(Array.from(concerns));
            if (!concern) {
                setConcern(concernsArr[0])
            }
        }
    }, [carData])

    useEffect(() => {
        if (carData && concern) {
            const brands = new Set();
            carData.forEach(v => {
                if (v.concern.name === concern) {
                    brands.add(v.brand.name)
                }
            })
            setBrandsArr(Array.from(brands));
            if (concernsArr.length === 1) {
                setBrand(brandsArr[0])
            }
        }
    }, [concern])


    useEffect(() => {
        if (carData && concern && brand) {
            const models = new Set();
            carData.forEach(e => {
                if (e.concern.name === concern && e.brand.name === brand) {
                    models.add(e.model.name)
                }
            })
            setModelArr(Array.from(models));
        }
    }, [brand])


    useEffect(() => {
        if (carData && concern && brand && model) {
            const engines = new Set();
            carData.forEach(e => {
                if (e.concern?.name === concern && e.brand?.name === brand && e.model?.name === model) {
                    engines.add(e.engine.name)
                }
            })
            setEnginesArr(Array.from(engines));
        }
    }, [model])

    useEffect(() => {
        const countries = new Set();
        if (citiesData) {
            citiesData.forEach(e => {
                    countries.add(e.countryCode);
                }
            );
            setCountriesArr(Array.from(countries));
        }
    }, [engine]);

    useEffect(() => {
        const cities = new Set();
        if (citiesData) {
            citiesData.forEach(e => {
                if (e.countryCode === country) {
                    cities.add(e.name);
                }

            });
        }

        setCitiesArr(Array.from(cities));
    }, [country]);


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
    const handleCountry = (e) => {
        setCountry(e)
    }

    const handleCity = (e) => {
        setCity(e)
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
            <Select label={"Выбери страну:"} values={countriesArr} onChange={handleCountry}/>
            <Select label={"Выбери город:"} values={citiesArr} onChange={handleCity}/>
        </div>
    );
};

export default Registration;
