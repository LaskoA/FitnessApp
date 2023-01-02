import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { ReactNode, useState } from 'react';

import { appConfig } from '@app/app/configs';

import { Text } from './Text';
import { ReactComponent as CalendarIcon } from '../images/calendar-icon.svg';

export interface DateProps extends Omit<DesktopDatePickerProps<any, any>, 'renderInput'> {
  readonly helperText?: ReactNode;
  readonly error?: boolean;
  readonly placeholder?: string;
}

export const Date = ({ value, helperText, error, placeholder, ...props }: DateProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DesktopDatePicker
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      value={value}
      // inputFormat={appConfig.format.date}
      {...props}
      renderInput={({ InputProps, inputProps, ...params }) => {
        return (
          <TextField
            {...params}
            helperText={helperText}
            error={error}
            inputProps={{ ...inputProps, placeholder }}
            InputProps={{
              ...InputProps,
              endAdornment: (
                <InputAdornment position="end" sx={{ mr: 1.75 }}>
                  <IconButton
                    aria-label="Toggle password visibility"
                    edge="end"
                    color="inherit"
                    onClick={() => setIsOpen(true)}
                  >
                    <CalendarIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
      }}
    />
  );
};
