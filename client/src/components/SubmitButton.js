const SubmitButton = (properties) => {
    return (
        <input type="submit" value={properties.text} className={"submit-button"}/>
    )
};

export default SubmitButton;