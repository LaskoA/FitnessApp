import {
  Box,
  ButtonBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Image from 'next/image';

import { Svg } from '@app/ui/svg';

import { BackButton } from './BackButton';
import { useSignInModal } from '../hooks/useSignInModal';
import avatar from '../images/user-avatar.png';
import { ReactComponent as InfoIcon } from '../images/icons/info.svg';
import { ReactComponent as CardsIcon } from '../images/icons/cards.svg';
import { ReactComponent as LogOutIcon } from '../images/icons/log-out.svg';
import { ReactComponent as BarBellIcon } from '../images/icons/bar-bell.svg';
import { ReactComponent as StatisticsIcon } from '../images/icons/statistics.svg';
import { ReactComponent as ParametersIcon } from '../images/icons/parameters.svg';
import { ReactComponent as PlanAndDoIcon } from '../images/icons/plan-and-do.svg';
import { ReactComponent as StrongHandIcon } from '../images/icons/strong-hand.svg';
import { ReactComponent as WeightliftingIcon } from '../images/icons/weightlifting.svg';

export interface LeftMenuProps {
  readonly children: ReactNode;
  readonly backgroundColor?: string;
  readonly enableBackButton?: boolean;
  readonly backButtonTitle?: string;
}

export const LeftMenu = ({ children, backgroundColor, enableBackButton = false, backButtonTitle }: LeftMenuProps) => {
  const { push, pathname, back } = useRouter();
  const { t } = useTranslation('common');
  const user = true;
  const [showModal] = useSignInModal({
    // onClose: () => {},
    onSubmit: () => {},
    title: 'register',
  });

  const menuList = [
    {
      id: 'trainings',
      icon: <StrongHandIcon />,
      to: '/trainings/my',
    },
    {
      id: 'programs',
      icon: <WeightliftingIcon />,
      to: '/programs',
    },
    {
      id: 'excersices',
      icon: <CardsIcon />,
      to: '/excersices',
    },
    {
      id: 'parameters',
      icon: <ParametersIcon />,
      to: '/parameters',
    },
    {
      id: 'statistics',
      icon: <StatisticsIcon />,
      to: '/statistics',
    },
  ];

  const active = menuList.find(({ id }) => pathname.includes(id));

  const gradient =
    'radial-gradient(163.01% 100% at 50% 0%, rgba(181, 44, 44, 0) 16.92%, rgba(254, 40, 220, 0.224414) 50.93%, rgba(254, 40, 40, 0.435461) 68.7%, rgba(254, 92, 40, 0.8) 100%)';

  return (
    <Box display="flex">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        py={{ md: 4 }}
        px={{ md: 6.25 }}
        position="relative"
        minHeight="100vh"
      >
        <Box
          position="absolute"
          top={0}
          bottom={0}
          right={0}
          left={0}
          zIndex={-1}
          sx={{
            backgroundColor: 'text.primary',
          }}
        />
        <Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <ButtonBase onClick={() => showModal()}>
              <PlanAndDoIcon />
            </ButtonBase>
            <Box mt={{ md: 2.5 }}>
              <BarBellIcon />
            </Box>
          </Box>
          {user && (
            <Box color="common.white" display="flex" flexDirection="column" alignItems="center" mt={{ md: 7 }}>
              <Image src={avatar.src} alt="avatar" height={80} width={80} style={{ borderRadius: '50%' }} />
              {/* user.fullName */}
              <Box mt={{ md: 2 }}>АРТУР АРТУРЕНКО</Box>
            </Box>
          )}
          <List>
            <Box color="common.white" mt={{ md: user ? 9 : 6.25 }} mx={{ md: -2 }}>
              {menuList.map(item => (
                <ListItem key={item.id} sx={{ p: 0 }}>
                  <ListItemButton
                    disableGutters
                    onClick={() => push(item.to)}
                    selected={active?.id === item.id}
                    sx={theme => ({
                      svg: {
                        fill: theme.palette.grey[200],
                      },
                      color: theme.palette.grey[200],
                      ':hover, &.Mui-selected, &.Mui-selected:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        svg: {
                          fill: theme.palette.common.white,
                        },
                        color: theme.palette.common.white,
                      },
                    })}
                  >
                    <ListItemIcon sx={{ minWidth: 24 }}>{item.icon}</ListItemIcon>
                    <Typography>{t(`menu.${item.id}.title`)}</Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </Box>
          </List>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          color="common.white"
          px={{ md: 6.25 }}
          mx={{ md: -6.25 }}
          mb={{ md: -4 }}
          pb={{ md: 5 }}
          height={{ md: 210 }}
          sx={{ background: gradient }}
        >
          <Box display="flex" justifyContent="center" gap={{ md: 5 }}>
            <IconButton>
              <LogOutIcon />
            </IconButton>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Grid container>
        <Grid item xs={12} sx={{ backgroundColor: backgroundColor }}>
          <Box py={{ md: 4 }} px={{ md: 6 }}>
            <Typography variant="h1">
              {/* replace true and update wrong title for backbutton */}
              {enableBackButton ? (
                <BackButton
                  title={backButtonTitle ? backButtonTitle : t(`menu.${active.id}.subtitle`)}
                  onClick={back}
                />
              ) : (
                t(`menu.${active?.id}.subtitle`)
              )}
            </Typography>
          </Box>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
