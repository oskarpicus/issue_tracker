import {Autocomplete, TextField} from "@mui/material";
import './myComboBox.css';

const MyComboBox = ({options, label, onChange, getOptionLabel, className, defaultValue, isOptionEqualToValue}) => {
    return (
        <Autocomplete
            isOptionEqualToValue={isOptionEqualToValue}
            defaultValue={defaultValue || undefined}
            className={`my-combo-box ${className}`}
            getOptionLabel={getOptionLabel}
            renderInput={(params) => <TextField
                {...params}
                label={label}
                className={"text-field-option"}
            />}
            options={options}
            onChange={onChange}
        />
    )
};

export default MyComboBox;
