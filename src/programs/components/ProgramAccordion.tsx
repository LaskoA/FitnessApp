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

import { useParams } from '@app/query';
import { Exercise } from '@app/queries/types';

import { ProgramAccordionChild } from './ProgramAccordionChild';
import { ReactComponent as ArrowRightIcon } from '../images/icons/arrow-right.svg';

interface AccordionElementCustomProps {
  readonly info?: string;
  readonly reps?: string;
  readonly sets?: string;
  readonly timePerRep?: string;
  readonly time?: string;
  readonly rest?: string;
  readonly quantity?: string;
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
        <Box>{text(el.rest)}</Box>
        <Box>{text(el.sets)}</Box>
      </Grid>
    </Grid>
  );
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} sx={{ '&.MuiPaper-root': { p: 0 } }} {...props} />
))(({ theme }) => ({
  '&:first-of-type': {
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
}));

interface ProgramAccordionProps {
  readonly items: Exercise[];
  readonly difficulty: string;
}

export const ProgramAccordion = ({ items, difficulty }: ProgramAccordionProps) => {
  const [expanded, setExpanded] = useState<string | false>('panel0d');
  const { level } = useParams();
  console.log(level)
  console.log(items)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const accordionDetails = {
    info: 'info',
    reps: 'reps',
    sets: 'sets',
    rest: 'rest',
  };

  return (
    <Box px={{ md: 6 }} display="flex" flexDirection="column" gap={{ md: 1 }} pb={{ md: 7 }}>
      {items.map((item, index) => (
        <Accordion key={item.id} expanded={expanded === `panel${index}d`} onChange={handleChange(`panel${index}d`)}>
          <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
            <Typography variant="body1">{item.type}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ color: 'grey.400' }}>
            <AccordionElement el={accordionDetails} transTitle />
          </AccordionDetails>
          {/* {items.map(item => ( */}
            <ProgramAccordionChild items={items} />
          {/* ))} */}
        </Accordion>
      ))}
    </Box>
  );
};