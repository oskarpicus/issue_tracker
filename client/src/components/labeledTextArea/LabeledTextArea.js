import './labeledTextArea.css';
import {Box} from "@mui/material";

const LabeledTextArea = ({text, name, onChange}) => {
    return (
        <Box className={"labeled-text-area"}>
            <p>{text}</p>
            <textarea
                name={name}
                onInput={(e) => onChange(name, e.currentTarget.value)}
            />
        </Box>
    )
};

export default LabeledTextArea;
