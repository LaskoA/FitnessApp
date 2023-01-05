import { Box, ButtonBase, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { Svg } from '@app/ui/svg';

import { ReactComponent as ArrowLeftIcon } from '../images/icons/arrow-left.svg';

export interface BackButtonProps {
  readonly to?: string;
  readonly onClick?: () => void;
  readonly title?: string;
}

export const BackButton = ({ to, onClick, title }: BackButtonProps) => {
  const { push } = useRouter();

  const handleClick = onClick ? onClick : () => push(to || '/');

  return (
    <ButtonBase onClick={handleClick}>
      <Box display="flex" alignItems="center" gap={2}>
        <Svg Icon={ArrowLeftIcon} size={24} />
        <Typography variant="h1">{title}</Typography>
      </Box>
    </ButtonBase>
  );
};
