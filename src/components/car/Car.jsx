import React, {Fragment, useEffect, useState} from 'react';
import Select from "../select/select.jsx";

const Car = (props) => {
    const [data, setData] = useState('')
    const [loader, setLoader] = useState(true)

    //Выбранные значения
    const [concern, setConcern] = useState('')
    const [concernIsListed, setConcernIsListed] = useState(false)

    const [brand, setBrand] = useState('')
    const [brandIsListed, setBrandIsListed] = useState(false)

    const [model, setModel] = useState('')
    const [modelIsListed, setModelIsListed] = useState(false)

    const [engine, setEngine] = useState('')

    const [result, setResult] = useState('')


    //Массивы для выбора
    const [concernsArr, setConcernsArr] = useState([]);
    const [brandsArr, setBrandsArr] = useState([]);
    const [modelsArr, setModelArr] = useState([]);
    const [enginesArr, setEnginesArr] = useState([]);

    //запрашиваем данные от апи

    useEffect(() => {
        fetchData();
        setLoader(false);
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
        setConcernIsListed(false)
        setBrandIsListed(false)
        setModelIsListed(false)
        if (data) {
            const concerns = new Set();
            data.forEach(v => concerns.add(v.concern.name));
            setConcernsArr(Array.from(concerns));
            setResult(data)
        }
    }, [data])

    //действия, когда изменился концерн
    useEffect(() => {
        if (data && concern) {
            //Устанавливаем отрисовку
            setConcernIsListed(true)
            setBrandIsListed(false)
            setModelIsListed(false)


            //Очищаем списки
            setBrandsArr([])
            setModelArr([])
            setEnginesArr([])

            //Формируем данные
            const brands = new Set();
            const res = new Set();
            data.forEach(v => {
                if (v.concern.name === concern) {
                    brands.add(v.brand.name)
                    res.add(v)
                }
            })
            //Сетим
            setBrandsArr(Array.from(brands));
            setResult(Array.from(res));
        }
    }, [concern])

    //действия, когда изменился бренд
    useEffect(() => {
        //Устанавливаем отрисовку
        setConcernIsListed(true)
        setBrandIsListed(true)
        setModelIsListed(false)


        //Очищаем списки
        setModelArr([])
        setEnginesArr([])


        if (data && concern && brand) {
            setModelIsListed(false)

            const models = new Set();
            const res = new Set();
            data.forEach(e => {
                if (e.concern.name === concern && e.brand.name === brand) {
                    models.add(e.model.name)
                    res.add(e)
                }
            })
            setModelArr(Array.from(models));
            setResult(Array.from(res));
        }
    }, [brand])

    //действия, когда изменилась модель
    useEffect(() => {
        //Устанавливаем отрисовку
        setConcernIsListed(true)
        setBrandIsListed(true)
        setModelIsListed(true)

        //Очищаем списки
        setEnginesArr([])


        if (data && concern && brand && model) {
            const engines = new Set();
            const res = new Set();
            data.forEach(e => {
                if (e.concern?.name === concern && e.brand?.name === brand && e.model?.name === model) {
                    engines.add(e.engine.name)
                    res.add(e)
                }
            })
            setEnginesArr(Array.from(engines));
            setResult(Array.from(res));
        }
    }, [model])

    //действия, когда изменился двигатель
    useEffect(() => {
        if (data && concern && brand && model && engine) {
            const res = new Set();
            data.forEach(e => {
                if (e.concern?.name === concern && e.brand?.name === brand && e.model?.name === model && e.engine?.name === engine) {
                    res.add(e)
                }
            })
            setResult(Array.from(res));
        }
    }, [engine])

    useEffect(() => {
        if (result) {
            props.handleCars(result)
        }
    }, [result])

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
            {loader ? (
                <h2>Загружаем данные..</h2>
            ) : (
                <>
                    <Select label={"Выбери концерн:"} values={concernsArr} onChange={handleConcern}/>
                    {
                        concernIsListed ? (
                            <Select label={"Укажи бренд:"} values={brandsArr} onChange={handleBrand}/>) : (<></>)
                    }

                    {
                        brandIsListed ? (
                            <Select label={"Выбери модель:"} values={modelsArr} onChange={handleModel}/>) : (<></>)
                    }
                    {
                        modelIsListed ? (
                            <Select label={"Выбери двигатель:"} values={enginesArr} onChange={handleEngine}/>) : (<></>)
                    }
                </>
            )}
        </div>
    );
};

export default Car;