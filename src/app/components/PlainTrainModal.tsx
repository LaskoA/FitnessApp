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
  const [isCreating, setIsCreating] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { myTrains } = useAppSelector(state => state.myTrainings);
  const { programs } = useAppSelector(state => state.programs);
  const {
    comment,
    name,
    program,
    date,
    user,
  } = useAppSelector(state => state.plainTrain);

  const dispatch = useAppDispatch();

  const getErrorMessage = () => {
    if (!name || !date || !program) {
      return 'Ім\'я, дата та програма обов\'язкові';
    }

    return 'Щось пішло не так';
  }

  // const uploadPrograms = async () => {
  //   const programs: Program[] = await getPrograms() as unknown as Program[];
  //   setPrograms(programs)
  // };

  // const uploadTrainings = async () => {
  //   const trainingsFromServer = await getTrainings();

  //   setTrainings(trainingsFromServer.filter(train => train.user === currentUserId));
  // }
  const resetPlainTrain = () => {
    dispatch(actionsPlainTrain.setName(''));
    dispatch(actionsPlainTrain.setDate(null));
    dispatch(actionsPlainTrain.setProgram(null));
    dispatch(actionsPlainTrain.setId(null));
    dispatch(actionsPlainTrain.setComment(''));
  }

  const handleOnChangeDate = (event: any) => {
    // dispatch(actionsPlainTrain.setDayId(event.toDate().getTime()));
    // console.log(event.toDate())
    setIsError(false);
    dispatch(actionsPlainTrain.setDate(event?.toDate()));
  }

  // useEffect(() => {
  //   console.log(date)
  // }, [date])

  const handleSelectedProgramId = (id: number) => {
    setIsError(false);
    dispatch(actionsPlainTrain.setProgram(id))
  }

  const handleToPlainTrain = async () => {
    if (!name || !date || !program) {
      setIsError(true);
      return;
    }

    let timeStamp: number;

    if (date instanceof Date) {
      timeStamp = date.getTime();
    }

    const myTrain: MyTrain = {
      comment,
      name,
      program,
      date: timeStamp,
      user,
    };

    try {
      setIsCreating(true);
      const plainedTrain = await createTrains(myTrain);

      plainedTrain.date = new Date(+plainedTrain.date);

      dispatch(actionsMyTrainings.setMyTrains([...myTrains, plainedTrain]));
      setIsSuccess(true);
      resetPlainTrain();
    } catch {
      setIsError(true);
      setTimeout(setIsError, 5000, false);
    } finally {
      setTimeout(setIsSuccess, 5000, false);
      setIsCreating(false);
    }
  }

  const handleNameTrain = (event: ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    dispatch(actionsPlainTrain.setName(event.target.value))
  }

  const handleComment = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(actionsPlainTrain.setComment(event.target.value))
  }

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
          <NamedTextField
            title="Назва тренування"
            placeholder="Назвіть своє тренування"
            sx={{
              mb: 2,
            }}
            value={name}
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
            value={comment}
            onChange={handleComment}
          />
        </Box>
      </DialogContent>
      <Box mt={{ md: 4 }} display="flex" mx="auto" width={220}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleToPlainTrain}
          disabled={isCreating}
        >
          {!isError && !isSuccess && t('general.buttons.plain')}
          {isError && getErrorMessage()}
          {!isError && isSuccess && 'Тренування створено!'}
        </Button>
      </Box>
    </Dialog>
  );
};
