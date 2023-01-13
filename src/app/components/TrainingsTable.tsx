import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';

import { MyTrain, Program, Train } from '@app/queries/types';

import { appConfig } from '../configs';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { FC, useEffect, useState } from 'react';
import { actions as actionsMyTrainings } from '../../redux/myTrainingsSlice';
import { actions as actionsPrograms } from '../../redux/programsSlice';
import { getPrograms, getTrainings } from '@app/queries';

// export interface TrainingsTableProps {
//   readonly item: Train;
// }

type Props = {
  showTrains: 'plained' | 'history',
}

const formatDate = (date: Date = new Date()) => {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate();
  
    return `${day}.${month}.${year}`;
  }
}

const currentUserId = 1; // get id from current user

export const TrainingsTable: FC<Props> = ({ showTrains }) => {
  console.log(showTrains);
  const { t } = useTranslation('common');

  const thead = ['date', 'program', 'name'];
  
  const [visibleTrains, setVisibleTrains] = useState<MyTrain[]>([]);
  const { myTrains } = useAppSelector(state => state.myTrainings);
  const { programs } = useAppSelector(state => state.programs);
  const dispatch = useAppDispatch();

  const uploadPrograms = async () => {
    const programsFromServer: Program[] = await getPrograms() as unknown as Program[];
    
    dispatch(actionsPrograms.setPrograms(programsFromServer))
  };

  const uploadTrainings = async () => {
    const trainingsFromServer = await getTrainings();

    dispatch(actionsMyTrainings.setMyTrains(
      trainingsFromServer.filter(train => train.user_id === currentUserId),
    ));
  };

  const getNameProgram = (id: number): string => {
    const program: Program = programs.find(program => program.id === id);

    return program.name;
  };

  useEffect(() => {
    uploadTrainings();
    uploadPrograms();
  },[]);

  useEffect(() => {
    if (showTrains === 'plained') {
      setVisibleTrains(myTrains.filter(train => {
        if (train.day instanceof Date) {
          return (train.day.getTime() + 86400000) >= new Date().getTime();
        }
      }))
    } else if (showTrains === 'history') {
      setVisibleTrains(myTrains.filter(train => {
        if (train.day instanceof Date) {
          return (train.day.getTime() + 86400000) < new Date().getTime();
        }
      }));
    }
  }, [myTrains, showTrains]);

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
          {visibleTrains.map(train => (
            <TableRow key={train.id}>
              <TableCell>
                <Typography variant="subtitle1">
                  {formatDate(train.day)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" color="grey.400">
                  {getNameProgram(train.program_id)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" color="grey.400">
                  {train.name}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
