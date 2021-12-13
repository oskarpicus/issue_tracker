import './labeledTextArea.css';
import {Box} from "@mui/material";

const DefaultLabeledTextArea = ({text, name, value, readOnly, onChange}) => {
    return (
        <Box className={"labeled-text-area"}>
            <p>{text}</p>
            <textarea
                readOnly={readOnly}
                value={value}
                name={name}
                onInput={(e) => onChange(name, e.currentTarget.value)}
            />
        </Box>
    )
};

export default DefaultLabeledTextArea;
