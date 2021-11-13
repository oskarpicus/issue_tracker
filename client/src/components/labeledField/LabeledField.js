import './labeledField.css';

/**
 * Component for creating a label, followed by a corresponding input tag
 * @param text: String, the label text
 * @param name: String, the name in which the information from the input tag will be retrieved
 * @param type: String, the type of the input tag
 * @param onChange: function, defines the behaviour when the user input changes. It expects as arguments the name of
 * the input tag and its value
 * @returns {JSX.Element}
 * @constructor
 */
const LabeledField = ({text, name, type, onChange}) => {
    return (
        <div className={"labeled-field"}>
            <p>{text}</p>
            <input type={type} name={name} onInput={(e) => onChange(name, e.currentTarget.value)}/>
        </div>
    )
};

export default LabeledField;
