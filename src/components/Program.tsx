import {
  Box,
  Grid,
  Typography,
  AccordionProps,
  AccordionSummaryProps,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  styled,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { useParams } from '@app/query';

import { useExercisesQuery } from '@app/queries';
import { LeftMenu } from '@app/app/components/LeftMenu';

import { ProgramAccordion } from './ProgramAccordion';
import { ReactComponent as ArrowRightIcon } from '../images/icons/arrow-right.svg';

export const Program = () => {
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [expandedChild, setExpandedChild] = useState<string | false>('panel2');
  // const { level } = useParams();
  // console.log(level)
  const { data = [] } = useExercisesQuery();
  console.log(data);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangeChild = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpandedChild(newExpanded ? panel : false);
  };

  const accordionDetails = {
    info: 'info',
    reps: 'reps',
    sets: 'sets',
    timePerRep: 'timePerRep',
  };

  return (
    <LeftMenu enableBackButton backButtonTitle="idi na hyi">
      <Box px={{ md: 6 }}>
        {/* in future panel1 replace width `panel${index + 1}` for mapping? */}
        <ProgramAccordion items={data} />
      </Box>
    </LeftMenu>
  );
};
