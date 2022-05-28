const InputError = (props: {errorExists: boolean}) => {
    return props.errorExists ? <h4>ERROR: Input improperly formatted</h4> : null;
};

export { InputError };