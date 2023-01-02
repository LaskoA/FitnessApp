import { TextField, TextFieldProps, MenuItem, CircularProgress, InputAdornment, Tooltip } from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export type TextProps = Omit<TextFieldProps, 'variant'> & { readonly isLoading?: boolean }; {/* readonly options?: Option[]; */}

export const Text = ({ label, value, type, InputProps = {}, isLoading = false, ...props }: TextProps) => {
  // options,
  return (
    <TextField
      margin="dense"
      type={type}
      label={value ? undefined : label}
      variant="outlined"
      value={type === 'number' && value ? Number(value) : value}
      InputLabelProps={{
        shrink: false,
        error: false,
      }}
      SelectProps={{
        autoWidth: false,
        displayEmpty: false,
        IconComponent: KeyboardArrowDown,
      }}
      InputProps={{
        startAdornment: isLoading ? (
          <InputAdornment sx={{ ml: 1 }} position="start">
            <CircularProgress color="primary" size={25} />
          </InputAdornment>
        ) : undefined,
        ...InputProps,
      }}
      {...props}
    >
      {/* {Array.isArray(options) &&
        options.map(option => (
          <MenuItem value={option.id} key={option.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {option.name}
            {option.info && <Tooltip />}
          </MenuItem>
        ))} */}
    </TextField>
  );
};
