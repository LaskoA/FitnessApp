import {
  Box,
  Grid,
  Button,
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

import { Svg } from '@app/ui/svg';
import { Exercise } from '@app/queries/types';
import { Meter } from '@app/app/components/Meter';

import { ReactComponent as ArrowRightIcon } from '../images/icons/arrow-right.svg';
import { ReactComponent as ReuseIcon } from '../images/icons/reuse.svg';

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
  <MuiAccordionSummary {...props} sx={{ borderRadius: 2.5, px: 4, py: 1 }} />
))(({ theme }) => ({
  // backgroundColor: theme.palette.primary.main,
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  // '&:not(:first-child)': {
    borderBottom: '1px solid',
    borderColor: theme.palette.primary.main,
  // }
}));

interface ProgramAccordionChildProps {
  readonly items: Exercise[];
}

export const ProgramAccordionChild = ({ items }: ProgramAccordionChildProps) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [expandedChild, setExpandedChild] = useState<string | false>('panel2');
  const { t } = useTranslation('common');
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
    <Box>
      {/* in future panel1 replace width `panel${index + 1}` for mapping? */}
        {items.map((item, index) => (
          <AccordionDetails key={item.id}>
            <Accordion expanded={expandedChild === `panel${index}`} onChange={handleChangeChild(`panel${index}`)}>
              <AccordionSummary aria-controls={`panel${index}x-content`} id={`panel${index}x-header`}>
                <AccordionElement el={item} />
              </AccordionSummary>
              <AccordionDetails sx={{ color: 'grey.400' }}>
                {/* <AccordionElement el={accordionDetails} transTitle /> */}
                <Box sx={{ backgroundColor: 'grey.500' }} p={3}>
                  <Grid container>
                    <Grid item md={3} display="flex">
                      <Box height={280} width={280} border="1px solid" m="auto">video</Box>
                    </Grid>
                    <Grid item md={3} display="flex" justifyContent="center">
                      <Box display="flex" flexDirection="column">
                        <Box height={140} width={140}>
                          <Meter
                            formatOptions={{ style: "unit", unit: "mile-per-hour" }}
                            aria-label="Speed"
                            maxValue={150}
                            value={100}
                          />
                        </Box>
                        <Box mt={{ md: 5 }}>
                          <Button fullWidth variant="contained">{t('general.buttons.pause')}</Button>
                          <Box display="flex" justifyContent="space-between" mt={{ md: 4 }}>
                            <Svg Icon={ReuseIcon} size={24} />
                            <Svg Icon={ArrowRightIcon} size={24} />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={6} display="flex" flexDirection="column" my="auto">
                      <Typography variant="h3" color="common.black">{t('excersices.rules')}</Typography>
                      <Box mt={{ md: 2 }}>
                        <Typography variant="body1">{item.description}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        ))}
    </Box>
  );
};