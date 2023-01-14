import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactNode, useState, useMemo } from 'react';
import { useField } from 'formik';
import dayjs, { Dayjs } from 'dayjs';

import { appConfig } from '@app/app/configs';

import { ReactComponent as CalendarIcon } from '../images/calendar-icon.svg';

export interface DateProps extends Omit<Omit<DesktopDatePickerProps<any, any>, 'renderInput'>, 'value' | 'onChange'> {
  readonly helperText?: ReactNode;
  readonly placeholder?: string;
  readonly label?: string;
  readonly name: string;
}

export function useErrorTranslations(
  field: string,
  error?: { key: string; values?: Record<string, string | number> } | string,
) {
  const { t } = useTranslation('common');

  return useMemo(() => {
    if (typeof error === 'object') {
      return t(`general.validations.${error.key}`, {
        ...error.values,
        field: field || t('general.this'),
      });
    }

    return error;
  }, [error]);
}

export const Date = ({ helperText, placeholder, className, name, label, ...props }: DateProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ value }, { touched, error }, { setValue }] = useField(name);

  const errorHelperText = useErrorTranslations(typeof label === 'string' ? label : name, error);

  const isError = Boolean(touched && errorHelperText);

  return (
    <Box>
      <Typography variant="subtitle1" color="grey.400">
        {label}
      </Typography>
      <Box mt={0.5}>
        <DesktopDatePicker
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          value={value}
          inputFormat={appConfig.format.date}
          {...props}
          renderInput={({ InputProps, inputProps, ...params }) => {
            return (
              <TextField
                {...params}
                fullWidth
                error={isError}
                helperText={helperText}
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
      </Box>
    </Box>
  );
};
