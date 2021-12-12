import './labeledField.css';

const DefaultLabeledField = ({text, value, type, name, readOnly, onChange}) => {
    return (
        <div className={"labeled-field"}>
            <p>{text}</p>
            <input
                readOnly={readOnly}
                defaultValue={value}
                type={type}
                name={name}
                onInput={onChange !== undefined ? ((e) => onChange(name, e.currentTarget.value)) : undefined}
            />
        </div>
    )
};

export default DefaultLabeledField;
