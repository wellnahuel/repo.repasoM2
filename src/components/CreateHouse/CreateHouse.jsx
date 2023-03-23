import React from 'react';
import { createHouse } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const CreateHouse = () => {
    
    const [input, setInput] = React.useState({
        name: "",
        region: "",
        price: "",
    })

    const dispatch = useDispatch()

    function handleSubmit (e){
        e.preventDefault();
        dispatch(createHouse(input))
        setInput({
            name: "",
            region: "",
            price: "",
        })

    }

    function handleInput(e){
        
        setInput({
            ...input, 
            [e.target.name]: e.target.value,
        });
        
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input name='name' onChange={handleInput}></input>
                <label>Region: </label>
                <input name='region' onChange={handleInput} ></input>
                <label>price: </label>
                <input name='price' onChange={handleInput}></input>
                <button type='submit'>Create</button>

            </form>

        </div>
    );
};

export default CreateHouse;
