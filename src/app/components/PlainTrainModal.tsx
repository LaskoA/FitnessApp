import { Box, Dialog, DialogTitle, DialogContent, DialogProps, Typography, Button, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';

import { Date as DateInput, InputSelect } from '@app/ui/forms';

import { appConfig } from '../configs';
import { ChangeEvent, useEffect, useState } from 'react';
import { createTrains, getPrograms, getTrainings } from '@app/queries';
import { MyTrain, Program, Train } from '@app/queries/types';

import { actions as actionsMyTrainings } from '../../redux/myTrainingsSlice';
import { actions as actionsPlainTrain } from '../../redux/plainTrainSlice';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { NamedTextField } from '@app/ui/forms/components/NamedTextField';

export interface PlainTrainModalProps extends DialogProps {
  readonly open: boolean;
  readonly onClose?: () => void;
}

const getFormatedDate = (date: number) => {
  return dayjs(date).format(appConfig.format.date)
}

// const currentUserId = 1; // get id from current user

// type MyTrain = {
//   date: string,
//   program: string,
//   nameTrain: string,
// }

export const PlainTrainModal = ({ open, onClose, children, title, ...props }: PlainTrainModalProps) => {
  const{ t } = useTranslation('common');
  // const today = dayjs(Date.now()).format(appConfig.format.date); 
  const today = getFormatedDate(Date.now()); 
  // const [programs, setPrograms] = useState<Program[]>(null)
  // const [trainings, setTrainings] = useState<Train[]>(null);

  const { myTrains } = useAppSelector(state => state.myTrainings);
  const { programs } = useAppSelector(state => state.programs);
  const {
    comment,
    name,
    program_id,
    day,
    user_id,
  } = useAppSelector(state => state.plainTrain);

  const dispatch = useAppDispatch();

  // const uploadPrograms = async () => {
  //   const programs: Program[] = await getPrograms() as unknown as Program[];
  //   setPrograms(programs)
  // };

  // const uploadTrainings = async () => {
  //   const trainingsFromServer = await getTrainings();

  //   setTrainings(trainingsFromServer.filter(train => train.user === currentUserId));
  // }

  const handleOnChangeDate = (event: any) => {
    // dispatch(actionsPlainTrain.setDayId(event.toDate().getTime()));
    dispatch(actionsPlainTrain.setDayId(event.toDate()));
  }

  const handleSelectedProgramId = (id: number) => {
    // console.log(id)
    dispatch(actionsPlainTrain.setProgramId(id))
  }

  const handleToPlainTrain = async () => {
    // const currentTrain = trainings.find(train => train.id === program_id);
    console.log(program_id)

    const myTrain: MyTrain = {
      comment,
      name,
      program_id,
      day,
      user_id,
      user: user_id,
    }

    try {
      await createTrains(myTrain)
    } catch {
      console.log('error')
    }

    dispatch(actionsMyTrainings.setMyTrains([...myTrains, myTrain]))
  }

  const handleNameTrain = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(actionsPlainTrain.setName(event.target.value))
  }

  const handleComment = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(actionsPlainTrain.setComment(event.target.value))
  }

  // useEffect(() => {
  //   console.log(program_id)
    // console.log('programs:', programs)
  // }, [program_id]);

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
            value={day}
            onChange={handleOnChangeDate}
          />
        </Box>
        <Box mt={{ md: 2.75 }}>
          <NamedTextField
            title="Назва тренування"
            placeholder="Назвіть своє тренування"
            sx={{
              mb: 2,
            }}
            onChange={handleNameTrain}
          />

          <InputSelect
            label={t('general.set.program')}
            placeholder={t('general.set.example')}
            programs={programs}
            setSelectedProgramId={handleSelectedProgramId}
            sx={{
              mb: 2,
            }}
          />

          <NamedTextField
            title="Коментар"
            placeholder="Додайте коментар"
            sx={{
              mb: 2,
            }}
            onChange={handleComment}
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
