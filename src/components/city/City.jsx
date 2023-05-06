import React, {useEffect, useState} from 'react';
import Select from "../select/select.jsx";

const City = (props) => {

    const [citiesData, setCitiesData] = useState('')
    const [country, setCountry] = useState('')
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

    let handleCountry;
    let handleCity;
    return (
        <div>
            <Select label={"Выбери страну:"} values={countriesArr} onChange={handleCountry}/>
            <Select label={"Выбери город:"} values={citiesArr} onChange={handleCity}/>
        </div>
    );
};

export default City;