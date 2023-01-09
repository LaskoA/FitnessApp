import { Box, Dialog, DialogTitle, DialogContent, DialogProps, Typography, Button, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';

import { Date as DateInput, InputSelect } from '@app/ui/forms';

import { appConfig } from '../configs';
import { ChangeEvent, useEffect, useState } from 'react';
import { getPrograms, getTrainings } from '@app/queries';
import { Program } from '@app/queries/types';

export interface PlainTrainModalProps extends DialogProps {
  readonly open: boolean;
  readonly onClose?: () => void;
}

const getFormatedDate = (date: number) => {
  return dayjs(date).format(appConfig.format.date)
}

export const PlainTrainModal = ({ open, onClose, children, title, ...props }: PlainTrainModalProps) => {
  const{ t } = useTranslation('common');
  // const today = dayjs(Date.now()).format(appConfig.format.date); 
  // const today = getFormatedDate(Date.now()); 
  const today = getFormatedDate(1683474400000); 
  const [date, setDate] = useState(today);
  const [programs, setPrograms] = useState<Program[]>(null)
  const [selectedIdProgram, setSelectedIdProgram] = useState<number>(null);

  const handleOnChangeDate = (event: any) => {
    setDate(getFormatedDate(event.toDate().getTime()));
  }

  const uploadPrograms = async () => {
    const programs: Program[] = await getPrograms() as unknown as Program[];
    setPrograms(programs)
  };

  useEffect(() => {
    uploadPrograms();
  }, [])

  const handleSelectedIdProgram = (id: number) => {
    setSelectedIdProgram(id);
  }

  useEffect(() => {
    console.log(date)
  }, [date]);


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
            dataSelect={programs}
            setSelectedIdProgram={handleSelectedIdProgram}
          />
        </Box>
      </DialogContent>
      <Box mt={{ md: 4 }} display="flex" mx="auto" width={220}>
        <Button
          variant="contained"
          fullWidth
        >
          {t('general.buttons.plain')}
        </Button>
      </Box>
    </Dialog>
  );
};
