import { ElementType } from 'react';
import { Box } from '@mui/material';

export interface SvgProps {
  readonly Icon: ElementType;
  readonly size?: any;
}

export const Svg = ({ Icon, size = { xs: '80%', md: '100%' } }: SvgProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        svg: {
          height: size,
          width: size,
        },
      }}
    >
      <Icon />
    </Box>
  );
};
