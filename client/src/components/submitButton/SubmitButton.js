import './submitButton.css';

/**
 * Component for creating a submit button
 * @param text: String, the text that the button will display
 * @returns {JSX.Element}
 * @constructor
 */
const SubmitButton = ({text}) => {
    return (
        <input type="submit" value={text} className={"submit-button"}/>
    )
};

export default SubmitButton;
