import React from 'react';
import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';

import { MyTrain, Program, Train } from '@app/queries/types';

import { appConfig } from '../configs';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { FC, useEffect, useState } from 'react';
import { actions as actionsMyTrainings } from '../../redux/myTrainingsSlice';
import { actions as actionsPrograms } from '../../redux/programsSlice';
import { deleteTrain, getPrograms, getTrainings } from '@app/queries';
import { TrainTableRow } from './TrainTableRow';

type Props = {
  showTrains: 'plained' | 'history',
}

export const TrainingsTable: FC<Props> = ({ showTrains }) => {
  const { t } = useTranslation('common');

  const thead = ['date', 'program', 'name'];
  
  const [visibleTrains, setVisibleTrains] = useState<MyTrain[]>([]);
  const { myTrains } = useAppSelector(state => state.myTrainings);
  const { user } = useAppSelector(state => state.plainTrain);
  const dispatch = useAppDispatch();

  const uploadPrograms = async () => {
    const programsFromServer: Program[] = await getPrograms() as unknown as Program[];
    
    dispatch(actionsPrograms.setPrograms(programsFromServer))
  };

  const uploadTrainings = async () => {
    const trainingsFromServer = await getTrainings();

    dispatch(actionsMyTrainings.setMyTrains(
      trainingsFromServer.filter(train => train.user === user),
    ));
  };

  useEffect(() => {
    uploadTrainings();
    uploadPrograms();
  }, []);

  useEffect(() => {
    if (showTrains === 'plained') {
      setVisibleTrains(myTrains?.filter(train => (
        (+train.date + 86400000) >= new Date().getTime()
      )))
    } else if (showTrains === 'history') {
      setVisibleTrains(myTrains?.filter(train => (
        (+train.date + 86400000) < new Date().getTime()
      )));
    }
  }, [myTrains, showTrains]);

  const getSortedTrains = () => {
    return visibleTrains && [...visibleTrains].sort((a, b) => {
      if (showTrains === 'plained') {
        return +a.date - +b.date;
      } else {
        return +b.date - +a.date;
      }
    })
  }

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
          {getSortedTrains()?.map(train => (
            <TableRow
              key={train.id}
            >
              <TrainTableRow train={train} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
