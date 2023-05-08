import React, {useEffect, useState} from 'react';
import Select from "../select/select.jsx";

const Car = (props) => {
    const [data, setData] = useState('')

    //Выбранные значения
    const [concern, setConcern] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [engine, setEngine] = useState('')
    const [car, setCar] = useState('')

    //Массивы для выбора
    const [concernsArr, setConcernsArr] = useState([""]);
    const [brandsArr, setBrandsArr] = useState([]);
    const [modelsArr, setModelArr] = useState([]);
    const [enginesArr, setEnginesArr] = useState([]);

    //запрашиваем данные от апи

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        fetch('https://dumpdot.ru/api/car/allCars', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setData(data.response)
        });
    };

    //действия, когда получили данные от апи
    useEffect(() => {
        if (data) {
            const concerns = new Set();
            concerns.add("");
            data.forEach(v => concerns.add(v.concern.name));
            setConcernsArr(Array.from(concerns));
        }
    }, [data])

    //действия, когда изменился концерн
    useEffect(() => {
        if (data && concern) {
            const brands = new Set();
            brands.add("");
            data.forEach(v => {
                if (v.concern.name === concern) {
                    brands.add(v.brand.name)
                }
            })
            setBrandsArr(Array.from(brands));
        }
    }, [concern])

    //действия, когда изменился бренд
    useEffect(() => {
        if (data && concern && brand) {
            const models = new Set();
            models.add("");
            data.forEach(e => {
                if (e.concern.name === concern && e.brand.name === brand) {
                    models.add(e.model.name)
                }
            })
            setModelArr(Array.from(models));
        }
    }, [brand])

    //действия, когда изменилась модель
    useEffect(() => {
        if (data && concern && brand && model) {
            const engines = new Set();
            engines.add("");
            data.forEach(e => {
                if (e.concern?.name === concern && e.brand?.name === brand && e.model?.name === model) {
                    engines.add(e.engine.name)
                }
            })
            setEnginesArr(Array.from(engines));
        }
    }, [model])


    useEffect(() => {
        if (data) {
            data.forEach(v => {
                if (v.brand.name === brand && v.model.name === model && v.engine.name === engine) {
                    setCar(JSON.stringify(v))
                    props.handleCar(JSON.stringify(v))
                }
            })

        }

    })
    /***
     * Обрабочкики выбора данных
     */
    const handleConcern = (concern) => {
        setConcern(concern)
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
    return (
        <div className={"car"}>
            <Select label={"Выбери концерн:"} values={concernsArr} onChange={handleConcern}/>
            <Select label={"Укажи бренд:"} values={brandsArr} onChange={handleBrand}/>
            <Select label={"Выбери модель:"} values={modelsArr} onChange={handleModel}/>
            <Select label={"Какой у тебя двигатель:"} values={enginesArr} onChange={handleEngine}/>
        </div>
    );
};

export default Car;