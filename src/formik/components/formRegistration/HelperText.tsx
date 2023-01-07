import React, { FC } from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';

type Props = {
  message?: string,
  error: boolean,
}

export const MyFormHelperText: FC<Props> = ({ message, error }) => {
  const helperText = React.useMemo(() => {
    // if (focused) {
    //   console.log(123123);
    // }

    if (error) {
      console.log(123)
      return message;
    }

    return message;
  }, [error]);

  return (
    <FormHelperText>
      {helperText}
    </FormHelperText>
  );
};
