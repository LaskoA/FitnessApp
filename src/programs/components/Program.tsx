import { Box } from '@mui/material';

import { useExercisesQuery } from '@app/queries';
import { LeftMenu } from '@app/app/components/LeftMenu';

import { ProgramAccordion } from './ProgramAccordion';

export const Program = () => {
  const { data = [] } = useExercisesQuery();
  // const params = useParams ();
  // params.level shows dynamic routes of ['easy', 'medium', 'hard'] for accordion

  return (
    <LeftMenu enableBackButton backButtonTitle="back">
      <Box px={{ md: 6 }}>
        <ProgramAccordion items={data} />
      </Box>
    </LeftMenu>
  );
};
