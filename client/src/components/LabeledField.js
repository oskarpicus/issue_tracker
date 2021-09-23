const LabeledField = (properties) => {
    return (
        <div className={"labeled-field"}>
            <p>{properties.text}</p>
            <input type={properties.isHidden ? "password" : "text"} name={properties.name} onInput={(e) => properties.onChange(properties.name, e.currentTarget.value)}/>
        </div>
    )
};

export default LabeledField;