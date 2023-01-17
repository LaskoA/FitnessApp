import React, { useState } from "react";
import { MyTrain, Program } from "@app/queries/types";
import { useAppDispatch, useAppSelector } from "@app/redux/hooks";
import { IconButton, TableCell, Typography } from "@mui/material";
import { actions as actionsMyTrainings, removeTrain } from '../../redux/myTrainingsSlice';
import { BasicModal } from './DeleteModal';
import { RiDeleteBin6Line } from 'react-icons/ri';


const formatDate = (date: Date = new Date()) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  if (
    date.getTime() - new Date().getTime() < 0
    && date.getTime() - new Date().getTime() > -86400000
  ) {
    return 'Сьогодні';
  }

  if (
    date.getTime() - new Date().getTime() < 86400000
    && date.getTime() - new Date().getTime() > 0
  ) {
    return 'Завтра';
  }

  return `${day}.${month}.${year}`;
}

type Props = {
  train: MyTrain,
}

export const TrainTableRow: React.FC<Props> = ({ train }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const { programs } = useAppSelector(state => state.programs);
  const { deleting, errorDeleting, deletedTrainId } = useAppSelector(state => state.myTrainings);
  const dispatch = useAppDispatch();
  
  const getNameProgram = (id: number): string => {
    const program: Program = programs.find(program => program.id === id);

    return program?.name;
  };

  const handleDeleteTrain = async () => {
    dispatch(actionsMyTrainings.setDeletedTrainId(train.id));
    
    try {
      await dispatch(removeTrain(train.id));
    } finally {
      setTimeout(dispatch, 5000, actionsMyTrainings.setErrorDeleting(false));
      setTimeout(dispatch, 5000, actionsMyTrainings.setDeletedTrainId(null));
    }
  }

  return (
    <>
      <TableCell>
        <Typography variant="subtitle1">
          {formatDate(new Date(+train.date))}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle1" color="grey.400">
          {getNameProgram(train.program)}
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          position: 'relative',
        }}
      >
        <Typography variant="subtitle1" color="grey.400">
          {train.name}
        </Typography>

        <IconButton
          aria-label="delete"
          size="small"
          sx={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
          color={errorDeleting && deletedTrainId === train.id ? 'error' : 'default'}
          disabled={deleting && deletedTrainId === train.id}
          onClick={handleOpen}
        >
          <RiDeleteBin6Line />
        </IconButton>
      </TableCell>
      <BasicModal 
        open={open} 
        setOpen={setOpen} 
        toDelete={handleDeleteTrain}
      />
    </>
  );
};
