import React, {useState} from 'react';

const Description = (props) => {
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const handlePrice = (e) => {
        setPrice(e.target.value)
        props.handlePrice(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
        props.handleDescription(e.target.value)
    }


    return (
        <div>
            <input
                className={'input'}
                type={"text"}
                placeholder={"Укажи цену"}
                value={price}
                onChange={handlePrice}
            />

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