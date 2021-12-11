import './labeledField.css';

const DefaultLabeledField = ({text, value, type, name, readOnly}) => {
    return (
        <div className={"labeled-field"}>
            <p>{text}</p>
            <input
                readOnly={readOnly}
                value={value}
                type={type}
                name={name}
            />
        </div>
    )
};

export default DefaultLabeledField;
