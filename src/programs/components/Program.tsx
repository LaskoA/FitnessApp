import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useParams } from '@app/query';
import { useExercisesQuery } from '@app/queries';
import { LeftMenu } from '@app/app/components/LeftMenu';

import { ProgramAccordion } from './ProgramAccordion';

export const Program = () => {
  const params = useParams ();
  const { t } = useTranslation('common');
  const { data = [] } = useExercisesQuery();

  // params.level shows dynamic routes of ['easy', 'medium', 'hard'] for accordion

  return (
    <LeftMenu enableBackButton backButtonTitle={t(`programs.levels.${params.level}.title`)}>
      <Box px={{ md: 6 }}>
        <ProgramAccordion items={data} difficulty={params.level} />
      </Box>
    </LeftMenu>
  );
};
