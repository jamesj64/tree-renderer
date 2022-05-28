import { useState } from 'react';
import { TreeInput } from "./TreeInput";

const jsonParseOrNull = (str: string) => {
    try {
        return JSON.parse(str);
    } catch (error) {
        return null;
    }
};

const TreeGenerator = () => {
    const [treeData, setTreeData] = useState({
        jsonValue: null,
        inputIsEmpty: true,
        submitted: false
    });

    const updateInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTextVal = e.target.value;
        const newJsonVal = jsonParseOrNull(newTextVal);
        setTreeData(prevState => {
            return {
                ...prevState,
                jsonValue: newJsonVal,
                inputIsEmpty: newTextVal == ""
            }
        });
    };

    const handleSubmit = () => {
        setTreeData(prevState => {
            return {
                ...prevState,
                submitted: true
            }
        });
        console.log(treeData);
    }
    if (!treeData.submitted) {
        return(<TreeInput
            handleSubmit={handleSubmit}
            handleUpdate={updateInput}
            errorExists={treeData.jsonValue == null && !treeData.inputIsEmpty}
            buttonDisabled={treeData.jsonValue == null}
        />);   
    } else {
        return(<h1>Generating Tree from JSON...</h1>);
    }
};

export { TreeGenerator };