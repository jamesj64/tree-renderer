import { useState } from 'react';
import { InputError } from './InputError';

const jsonParseOrNull = (str: string) => {
    try {
        return JSON.parse(str);
    } catch (error) {
        return null;
    }
};

const TreeInput = () => {

    const [treeInput, setInput] = useState({
        jsonValue: null,
        inputIsEmpty: true
    });

    const updateInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTextVal = e.target.value;
        const newJsonVal = jsonParseOrNull(newTextVal);
        setInput({
            jsonValue: newJsonVal,
            inputIsEmpty: newTextVal == "",
        });
    };

    const handleClick = () => {
        console.log(treeInput.jsonValue);
    };

    return (
        <div className='TreeInput'>
            <h1>Enter JSON code for tree</h1>
            <InputError errorExists={treeInput.jsonValue == null && !treeInput.inputIsEmpty} />
            <textarea placeholder='Enter JSON here...' onChange={e => updateInput(e)}></textarea>
            <br />
            <button onClick={handleClick} disabled={treeInput.jsonValue == null}>Generate Tree</button>
        </div>
    );

}

export { TreeInput }