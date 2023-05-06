import React, {useEffect, useState} from 'react';
import Select from "../select/select.jsx";

const Car = (props) => {
    const [data, setData] = useState('')

    //Выбранные значения
    const [concern, setConcern] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [engine, setEngine] = useState('')

    //Массивы для выбора
    const [concernsArr, setConcernsArr] = useState([]);
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
            data.forEach(v => concerns.add(v.concern.name));
            setConcernsArr(Array.from(concerns));
            if (concerns.size === 1) {
                setConcern(concernsArr[0])
            }
        }
    }, [data])

    //действия, когда изменился концерн
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

    //действия, когда изменился бренд
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

    //действия, когда изменилась модель
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


    /***
     * Обрабочкики выбора данных
     */
    const handleConcern = (concern) => {
      //  props.handleConcern(e);
        setConcern(concern)
        setBrand(null)
        setModel(null)
        setEngine(null)
    }

    const handleBrand = (e) => {
      //  props.onChange(e);
    }

    const handleModel = (e) => {
   //     props.handleModel(e);
    }
    const handleEngine = (e) => {
  //      props.handleEngine(e);
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

Car.propTypes = {};

export default Car;

//TODO сделать колбеки