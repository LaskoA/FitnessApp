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
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Exercise } from '@app/queries/types';

import { ProgramAccordionChild } from './ProgramAccordionChild';
import { ReactComponent as ArrowRightIcon } from '../images/icons/arrow-right.svg';

interface AccordionElementCustomProps {
  readonly info: string;
  readonly reps: string;
  readonly sets: string;
  readonly timePerRep: string;
}

interface AccordionElementProps {
  readonly el: Partial<Exercise> | AccordionElementCustomProps;
  readonly transTitle?: boolean;
}

const AccordionElement = ({ el, transTitle }: AccordionElementProps) => {
  const { t } = useTranslation('common');

  const text = (string) => transTitle ? t(`excersices.${string}`) : string;

  return (
    <Grid container width={1}>
      <Grid item md={9}>
        <Typography variant="subtitle1">{text(el.info)}</Typography>
      </Grid>
      <Grid item md={3} display="flex" justifyContent="space-around" color="grey.400">
        <Box>{text(el.reps)}</Box>
        <Box>{text(el.sets)}</Box>
        <Box>{text(el.timePerRep)}</Box>
      </Grid>
    </Grid>
  );
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} sx={{ '&.MuiPaper-root': { p: 0 } }} {...props} />
))(({ theme }) => ({
  // borderBottom: `1px solid ${theme.palette.divider}`,
  '&:first-child': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowRightIcon />} {...props} sx={{ borderRadius: 2.5, px: 4, py: 1 }} />
))(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '16px 32px',
  // borderBottom: '1px solid',
  // borderColor: theme.palette.primary.main,
}));

interface ProgramAccordionProps {
  readonly items: Exercise[];
}

export const ProgramAccordion = ({ items }: ProgramAccordionProps) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [expandedChild, setExpandedChild] = useState<string | false>('panel2');
  // const { level } = useParams();
  // console.log(level)
  // const { data = [] } = useExercisesQuery();
  // console.log(data);

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
    // <LeftMenu enableBackButton backButtonTitle="idi na hyi">
      <Box px={{ md: 6 }}>
        {/* in future panel1 replace width `panel${index + 1}` for mapping? */}
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography variant="body1">custom text?</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ color: 'grey.400' }}>
            <AccordionElement el={accordionDetails} transTitle />
          </AccordionDetails>
          {/* {items.map(item => ( */}
            <ProgramAccordionChild items={items} />
          {/* ))} */}
        </Accordion>
      </Box>
    // </LeftMenu>
  );
};