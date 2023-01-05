import { Box, Typography, TextField } from '@mui/material';

import { Svg } from '@app/ui/svg';

import { ReactComponent as SelectDownIcon } from '../images/select-down.svg';

export interface InputSelectProps {
  readonly label: string;
  readonly placeholder: string;
}

export const InputSelect = ({ label, placeholder }: InputSelectProps) => {
  // get options from backend and compare them with common.json
  // add SelectDownIcon as arrow for select dropdown
  return (
    <Box>
      <Typography variant="subtitle1" color="grey.400">{label}</Typography>
      <Box mt={.5}>
        <TextField select type="text" fullWidth defaultValue={placeholder} />
      </Box>
    </Box>
  );
};
