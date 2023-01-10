import { Box, Dialog, DialogTitle, DialogContent, DialogProps, Typography, Button, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';

import { Date as DateInput, InputSelect } from '@app/ui/forms';

import { appConfig } from '../configs';
import { ChangeEvent, useEffect, useState } from 'react';
import { getPrograms, getTrainings } from '@app/queries';
import { Program, Train } from '@app/queries/types';

import { actions as actionsMyTrainings } from '../../redux/myTrainingsSlice';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';

export interface PlainTrainModalProps extends DialogProps {
  readonly open: boolean;
  readonly onClose?: () => void;
}

const getFormatedDate = (date: number) => {
  return dayjs(date).format(appConfig.format.date)
}

const currentUserId = 1; // get id from current user

type MyTrain = {
  date: string,
  program: string,
  nameTrain: string,
}

export const PlainTrainModal = ({ open, onClose, children, title, ...props }: PlainTrainModalProps) => {
  const{ t } = useTranslation('common');
  // const today = dayjs(Date.now()).format(appConfig.format.date); 
  const today = getFormatedDate(Date.now()); 
  const [date, setDate] = useState(today);
  const [programs, setPrograms] = useState<Program[]>(null)
  const [trainings, setTrainings] = useState<Train[]>(null);
  const [selectedIdTrain, setSelectedIdTrain] = useState<number>(null);

  const { myTrains } = useAppSelector(state => state.myTrainings);
  const dispatch = useAppDispatch();

  const handleOnChangeDate = (event: any) => {
    setDate(getFormatedDate(event.toDate().getTime()));
  }

  const uploadPrograms = async () => {
    const programs: Program[] = await getPrograms() as unknown as Program[];
    setPrograms(programs)
  };

  const uploadTrainings = async () => {
    const trainingsFromServer = await getTrainings();

    setTrainings(trainingsFromServer.filter(train => train.user === currentUserId));
  }

  useEffect(() => {
    uploadPrograms();
    uploadTrainings();
  }, [])

  const handleSelectedIdTrain = (id: number) => {
    setSelectedIdTrain(id);
  }

  const handleToPlainTrain = () => {
    const currentTrain = trainings.find(train => train.id === selectedIdTrain);

    const myTrain: MyTrain = {
      date,
      program: programs.find(program => program.id === currentTrain.program)?.name,
      nameTrain: currentTrain.name,
    }

    dispatch(actionsMyTrainings.setMyTrain([...myTrains, myTrain]))
  }

  useEffect(() => {
    console.log(myTrains)
  }, [myTrains]);

  // useEffect(() => {
  //   console.log(date)
  // }, [date]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...props}
      sx={{ px: { md: 8 }, py: { md: 6 }, '.MuiPaper-root': { backgroundColor: 'primary.main', width: 470 } }}
    >
      <DialogTitle p={0}>
        <Typography variant="h3">{t('general.buttons.plainTrain')}</Typography>
      </DialogTitle>
      <DialogContent>
        <Box mt={{ md: 2.75 }}>
          <DateInput
            label={t('general.set.date')}
            value={date}
            onChange={handleOnChangeDate}
          />
        </Box>
        <Box mt={{ md: 2.75 }}>
          <InputSelect
            label={t('general.set.program')}
            placeholder={t('general.set.example')}
            trainings={trainings}
            setSelectedIdTrain={handleSelectedIdTrain}
            // handleToPlainTrain={handleToPlainTrain}
          />
        </Box>
      </DialogContent>
      <Box mt={{ md: 4 }} display="flex" mx="auto" width={220}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleToPlainTrain}
        >
          {t('general.buttons.plain')}
        </Button>
      </Box>
    </Dialog>
  );
};
