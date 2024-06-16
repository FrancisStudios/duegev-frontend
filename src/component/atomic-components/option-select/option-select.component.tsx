import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export type OptionSelectCustomProps = {
    options: Array<OptionSelectCustomOption>
    label: string,
    helperText?: string,
    defaultValue?: string,
    id?: string
}

type OptionSelectCustomOption = {
    value: string,
    label: string
}

export default function OptionSelectCustom(props: OptionSelectCustomProps) {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id={props.id}
                    select
                    label={props.label}
                    defaultValue={props.defaultValue}
                    helperText={props.helperText}
                >
                    {props.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </Box>
    );
}