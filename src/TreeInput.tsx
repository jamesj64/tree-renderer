import { ChangeEvent, MouseEventHandler} from 'react';
import { InputError } from './InputError';


//TODO: call props.handleUpdate only when user stops typing
const TreeInput = (props: { errorExists: boolean; handleUpdate: (arg0: ChangeEvent<HTMLTextAreaElement>) => void; handleSubmit: MouseEventHandler<HTMLButtonElement> | undefined; buttonDisabled: boolean | undefined; }) => {
    return (
        <div className='TreeInput'>
            <h1>Enter JSON code for tree</h1>
            <InputError errorExists={props.errorExists} />
            <textarea placeholder='Enter JSON here...' onChange={e => props.handleUpdate(e)}></textarea>
            <br />
            <button onClick={props.handleSubmit} disabled={props.buttonDisabled}>Generate Tree</button>
        </div>
    );
}

export { TreeInput }