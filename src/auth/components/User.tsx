import { Box } from '@mui/material';

import { useGetUser, useTrainQuery } from '@app/queries';
import { LeftMenu } from '@app/app/components/LeftMenu';

export const User = () => {
  // const { data } = useTrainQuery();
  // console.log(data)
  // train()

  return (
    <LeftMenu backgroundColor='grey.50'>
      <Box>
        profile content
      </Box>
    </LeftMenu>
  );
};
