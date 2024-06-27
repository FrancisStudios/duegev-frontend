import { Button, TextField } from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';

export type CustomInputProps = {
    id: string,
    label: string,
    disabled?: boolean,
    className?: string,
    placeholder?: string
    defaultValue?: string
    refresh?: boolean
    refreshClicked?: CallableFunction
}
const CustomInput = (props: CustomInputProps) => {

    return (
        <TextField
            id={props.id}
            label={props.label}
            variant="outlined"
            className={props.className}
            disabled={props.disabled}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            InputProps={{
                endAdornment: props.refresh
                    ? <Button onClick={
                        (e) => {
                            if (props.refreshClicked) props.refreshClicked({ event: e, id: props.id, label: props.label })
                        }
                    }>
                        <CachedIcon />
                    </Button>

                    : <></>
            }}
        />
    );
}
export default CustomInput;