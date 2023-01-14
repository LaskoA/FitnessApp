import { Box, Typography, TextField } from '@mui/material';

export interface InputSelectProps {
  readonly label: string;
  readonly placeholder: string;
  readonly type?: string;
}

export const Input = ({ label, placeholder, type }: InputSelectProps) => {
  return (
    <Box>
      <Typography variant="subtitle1" color="grey.400">{label}</Typography>
      <Box mt={.5}>
        <TextField type={type} fullWidth defaultValue={placeholder} />
      </Box>
    </Box>
  );
};
