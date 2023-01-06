import {
  Box,
  Grid,
  Button,
  Typography,
  IconButton,
  AccordionProps,
  AccordionSummaryProps,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  styled,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import ReactPlayer from 'react-player/youtube';

import { Svg } from '@app/ui/svg';
import { Exercise } from '@app/queries/types';
import { Meter } from '@app/app/components/Meter';

import { ReactComponent as ArrowRightIcon } from '../images/icons/arrow-right.svg';
import { ReactComponent as ReuseIcon } from '../images/icons/reuse.svg';

interface AccordionElementCustomProps {
  readonly info: string;
  readonly reps: string;
  readonly sets: string;
  readonly rest: string;
  readonly timePerRep: string;
}

interface AccordionElementProps {
  readonly el: Partial<Exercise> | AccordionElementCustomProps;
  readonly transTitle?: boolean;
}

const AccordionElement = ({ el, transTitle }: AccordionElementProps) => {
  const { t } = useTranslation('common');

  const text = string => (transTitle ? t(`excersices.${string}`) : string);

  return (
    <Grid container width={1}>
      <Grid item md={9}>
        <Typography variant="subtitle1">{text(el.info)}</Typography>
      </Grid>
      <Grid item md={3} display="flex" justifyContent="space-around" color="grey.400">
        <Box>{text(el.reps)}</Box>
        <Box>{t('excersices.time', { value: el.rest })}</Box>
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
  <MuiAccordionSummary {...props} sx={{ borderRadius: 2.5, px: 4, py: 1 }} />
))(({ theme }) => ({
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
  borderBottom: '1px solid',
  borderColor: theme.palette.primary.main,
}));

interface ProgramAccordionChildProps {
  readonly items: Exercise[];
}

export const ProgramAccordionChild = ({ items }: ProgramAccordionChildProps) => {
  const [expandedChild, setExpandedChild] = useState<string | false>('panel0x');
  const [isStarted, setStarted] = useState(false);
  const { t } = useTranslation('common');

  const handleChangeChild = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpandedChild(newExpanded ? panel : false);
  };

  const handlePause = () => {
    setStarted(!isStarted);

    console.log(t(`general.buttons.${isStarted ? 'pause' : 'start'}`))
  };

  return (
    <Box>
      {items.map((item, index) => {
        const time = Number(item.timePerRep) * Number(item.sets) * Number(item.reps);

        return (
          <AccordionDetails key={item.id}>
            <Accordion expanded={expandedChild === `panel${index}x`} onChange={handleChangeChild(`panel${index}x`)}>
              <AccordionSummary aria-controls={`panel${index}x-content`} id={`panel${index}x-header`}>
                <AccordionElement el={item} />
              </AccordionSummary>
              <AccordionDetails sx={{ color: 'grey.400' }}>
                <Box sx={{ backgroundColor: 'grey.500' }} p={3}>
                  <Grid container>
                    <Grid item md={5.5} display="flex">
                      <Box maxHeight={280} maxWidth="100%" m="auto">
                        {/* add loader while await data? */}
                        <ReactPlayer
                          playing={isStarted}
                          onStart={() => setStarted(true)}
                          onPlay={() => setStarted(true)}
                          onPause={() => setStarted(false)}
                          url={item.video}
                          style={{ maxWidth: '100%', maxHeight: 280, aspectRatio: '16/9' }}
                        />
                      </Box>
                    </Grid>
                    <Grid item md={2.5} display="flex" justifyContent="center" alignItems="center">
                      <Box display="flex" flexDirection="column">
                        <Box height={140} width={140}>
                          <Meter value={time} item={item} />
                        </Box>
                        {/* TODO: buttons actions */}
                        <Box mt={{ md: 5 }}>
                          <Button fullWidth variant="contained" onClick={handlePause}>
                            {t(`general.buttons.${isStarted ? 'pause' : 'start'}`)}
                          </Button>
                          <Box display="flex" justifyContent="space-between" mt={{ md: 4 }}>
                            <IconButton sx={{ m: -1 }} onClick={() => console.log('train again')}>
                              <Svg Icon={ReuseIcon} size={24} />
                            </IconButton>
                            <IconButton sx={{ m: -1 }} onClick={() => console.log('next excersice')}>
                              <Svg Icon={ArrowRightIcon} size={24} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={4} display="flex" flexDirection="column" my="auto">
                      <Typography variant="h3" color="common.black">
                        {t('excersices.rules')}
                      </Typography>
                      <Box mt={{ md: 2 }}>
                        <Typography variant="body1">{item.description}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        );
      })}
    </Box>
  );
};
