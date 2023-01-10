import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';

import { Train } from '@app/queries/types';

import { appConfig } from '../configs';
import { useAppSelector } from '@app/redux/hooks';

export interface TrainingsTableProps {
  readonly item: Train;
}

export const TrainingsTable = ({ item }: TrainingsTableProps) => {
  const { t } = useTranslation('common');

  const thead = ['date', 'program', 'name'];

  const { myTrains } = useAppSelector(state => state.myTrainings);

  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ backgroundColor: 'primary.main' }}>
          <TableRow>
            {thead.map(item => (
              <TableCell key={item}>
                {t(`table.${item}`)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {myTrains.map(train => (
            <TableRow key={item.id}>
              <TableCell>
                <Typography variant="subtitle1">
                  {train.date}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" color="grey.400">{item.muscles.map(el => el.title)}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" color="grey.400">{item.name}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
