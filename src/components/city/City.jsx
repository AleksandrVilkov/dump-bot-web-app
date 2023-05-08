import React, {useEffect, useState} from 'react';
import Select from "../select/select.jsx";

const City = (props) => {

    const [citiesData, setCitiesData] = useState('')
    const [country, setCountry] = useState('')
    const [name, setName] = useState('')
    const [city, setCity] = useState('')

    const [countriesArr, setCountriesArr] = useState([]);
    const [citiesArr, setCitiesArr] = useState([]);

    const fetchData = () => {
        fetch('https://dumpdot.ru/api/place/cities', {
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
        const countries = new Set();
        countries.add("");
        if (citiesData) {
            citiesData.forEach(v => {
                countries.add(v.countryCode)
            })
        }
        setCountriesArr(Array.from(countries));
    }, [citiesData])

    useEffect(() => {
        const cities = new Set();
        cities.add("");
        if (citiesData) {
            citiesData.forEach(v => {
                if (country === v?.countryCode) {
                    cities.add(v.name)
                }
            })
        }
        setCitiesArr(Array.from(cities));
    }, [country])

    useEffect(() => {
        if (citiesData) {
            citiesData.forEach(v => {
                if (v.countryCode === country && v.name === city) {
                    setCity(JSON.stringify(v))
                    props.handleCity(JSON.stringify(v))
                }
            })
        }
    })

    const handleCountry = (e) => {
        setCountry(e)
    }

    const handleCity = (e) => {
        setCity(e)
    }
    return (
        <div>
            <Select label={"Выбери страну:"} values={countriesArr} onChange={handleCountry}/>
            <Select label={"Выбери город:"} values={citiesArr} onChange={handleCity}/>
        </div>
    );
};

export default City;