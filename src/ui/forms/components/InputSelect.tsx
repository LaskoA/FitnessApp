import { Box, Typography, TextField, MenuItem, Stack, Divider, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Svg } from '@app/ui/svg';

import { ReactComponent as SelectDownIcon } from '../images/select-down.svg';
import { Program, Train } from '@app/queries/types';
import { Dispatch, SetStateAction } from 'react';

export interface InputSelectProps extends BoxProps {
  readonly label: string;
  readonly placeholder: string;
  trainings?: Train[];
  setSelectedIdTrain?: Dispatch<SetStateAction<number>>;
  // handleToPlainTrain: () => void;
}

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(4),
//   textAlign: 'start',
//   color: theme.palette.text.secondary,
// }));

export const InputSelect = ({
  label,
  placeholder,
  trainings,
  setSelectedIdTrain,
  // handleToPlainTrain,
  ...props
}: InputSelectProps) => {
  // get options from backend and compare them with common.json
  // add SelectDownIcon as arrow for select dropdown
  // console.log(placeholder)
  return (
    <Box {...props}>
      <Typography variant="subtitle1" color="grey.400">{label}</Typography>
      <Box mt={.5}>
        <TextField
          select type="text"
          fullWidth
          defaultValue={placeholder}
        >
          {trainings?.map(train => (
            <MenuItem
              key={train.id}
              value={train.id}
              onClick={() => setSelectedIdTrain(train.id)}
            >
              <TableContainer>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {train.name}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
};
