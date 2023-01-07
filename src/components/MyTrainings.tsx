import { Box, Tabs, Tab, Typography, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ReactNode, useState } from 'react';

import { useTrainingsQuery } from '@app/queries';
import { LeftMenu } from '@app/app/components/LeftMenu';
import { TrainingsTable } from '@app/app/components/TrainingsTable';
import { usePlainTrainModal } from '@app/app/hooks/usePlainTrainModal';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index, ...props }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...props}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const MyTrainings = () => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation('common');
  const { data = [], isLoading } = useTrainingsQuery();
  console.log(data)

  const [showModal] = usePlainTrainModal({
    // onClose: () => {},
    onSubmit: () => {},
    title: 'plain',
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = ['plained', 'history'];

  return (
    <LeftMenu>
      <Box px={{ md: 6 }}>
        <Box display="flex" justifyContent="space-between">
          <Box
            sx={{
              borderBottom: '2px solid',
              borderColor: 'primary.main',
              width: 'min-content',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="basic tabs example"
            >
              {tabs.map((item, index) => (
                <Tab
                  key={item}
                  label={
                    <Typography variant="body1" textTransform="capitalize">
                      {t(`general.${item}.title`)}
                    </Typography>
                  }
                  {...a11yProps(index)}
                  sx={{
                    width: 264,
                    color: 'common.black',
                  }}
                />
              ))}
            </Tabs>
          </Box>
          <Button variant="contained" sx={{ py: 1.75 }} onClick={() => showModal()}>
            {t('general.buttons.plainTrain')}
          </Button>
        </Box>
        {/* switch true or false to show table or description of empty page */}
        {false ? ( // replace with plained.length later
          <TabPanel value={value} index={value}>
            <Box maxWidth={640}>
              <Typography variant="h2">{t('menu.trainings.plain.title')}</Typography>
              <Box mt={{ md: 2 }}>
                <Typography variant="body1" color="grey.200">
                  {t('menu.trainings.plain.subtitle')}
                </Typography>
              </Box>
            </Box>
          </TabPanel>
        ) : (
          <TabPanel value={value} index={value}>
            <Box mt={{ md: 2.5 }}>
              {data.map(item => (
                <TrainingsTable key={item.id} item={item} />
              ))}
            </Box>
          </TabPanel>
        )}
      </Box>
    </LeftMenu>
  );
};
