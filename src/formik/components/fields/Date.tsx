import { useField } from 'formik';
import dayJs, { Dayjs } from 'dayjs';

import { appConfig } from '@app/app/configs';
import { Date as MuiDate, DateProps as MuiDateProps } from '@app/ui/forms/components/DatePicker';

export interface DateProps extends Omit<MuiDateProps, 'value' | 'onBlur' | 'onChange'> {
  readonly name: string;
}

export const Date = ({ name, label, helperText, ...props }: DateProps) => {
  const [{ value }, { touched, error }, { setValue }] = useField(name);

  // const errorHelperText = useErrorTranslations(typeof label === 'string' ? label : name, error);

  // const isError = Boolean(touched && errorHelperText);

  return (
    <MuiDate
      label={label}
      value={value ? dayJs(value, appConfig.format.date) : value}
      // error={isError}
      // helperText={isError ? errorHelperText : helperText || ' '}
      error={false}
      helperText="err"
      {...props}
      onChange={(date: Dayjs | null) => {
        setValue(date ? date.format(appConfig.format.date) : '');
      }}
    />
  );
};
