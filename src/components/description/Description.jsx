import React, {useState} from 'react';

const Description = (props) => {
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [validPrice, setValidPrice] = useState(false)

    const handlePrice = (e) => {
        const price = e.target.value
        const pattern = "\[0-9]{"+price.length+"}"
        var rexexp = new RegExp(pattern)
        console.log(rexexp.test(price))
        if (rexexp.test(price)) {
            setPrice(price)
            props.handlePrice(price)
            setValidPrice(true)
        } else {
            setPrice(price)
            setValidPrice(false)
        }
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
        props.handleDescription(e.target.value)
    }


    return (
        <div>
            {props.needPrice ? (<> <input
                className={'input'}
                type={"text"}
                placeholder={"Укажи цену"}
                value={price}
                onChange={handlePrice}
            />
                {validPrice ? (<></>) : (<>Допустимо указывать только числовые значения!</>)}
            </>) : (<></>)
            }


            <input
                className={'input'}
                type={"text"}
                placeholder={"Добавь описание:"}
                value={description}
                onChange={handleDescription}
            />
        </div>
    );
};

export default Description;