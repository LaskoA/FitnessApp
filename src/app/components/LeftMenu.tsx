import { Box, ButtonBase, List, ListItem, ListItemButton, ListItemIcon, Typography, Grid, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Image from 'next/image';

import { Svg } from '@app/ui/svg';

import { useSignInModal } from '../hooks/useSignInModal';
import avatar from '../images/user-avatar.png';
import { ReactComponent as BugIcon } from '../images/icons/bug.svg';
import { ReactComponent as InfoIcon } from '../images/icons/info.svg';
import { ReactComponent as LogOutIcon } from '../images/icons/log-out.svg';
import { ReactComponent as BarBellIcon } from '../images/icons/bar-bell.svg';
import { ReactComponent as PlanAndDoIcon } from '../images/icons/plan-and-do.svg';

export interface LeftMenuProps {
  readonly children: ReactNode;
  readonly backgroundColor?: string;
}

// readonly open: boolean;
//   readonly onClose: () => void;
//   readonly title: string;
//   readonly onSubmit: () => void;
//   readonly cancelText?: string;
//   readonly submitText?: string;
//   readonly isLoading?: boolean;
export const LeftMenu = ({ children, backgroundColor }: LeftMenuProps) => {
  const { push } = useRouter();
  const user = true;
  const [showModal] = useSignInModal({
    // onClose: () => {},
    onSubmit: () => {},
    title: 'register',
  });

  const menuList = [
    {
      title: 'Мої тренування',
      icon: <BugIcon />,
      to: '/trainings/my',
    },
    {
      title: 'Програми тренувань',
      icon: <BugIcon />,
      to: '/cabinet',
    },
    {
      title: 'Каталог вправ',
      icon: <BugIcon />,
      to: '/cabinet',
    },
    {
      title: 'Заміри тіла',
      icon: <BugIcon />,
      to: '/cabinet',
    },
    {
      title: 'Статистика',
      icon: <BugIcon />,
      to: '/cabinet',
    },
  ];

  const gradient = 'radial-gradient(163.01% 100% at 50% 0%, rgba(181, 44, 44, 0) 16.92%, rgba(254, 40, 220, 0.224414) 50.93%, rgba(254, 40, 40, 0.435461) 68.7%, rgba(254, 92, 40, 0.8) 100%)';

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
                <ListItem key={item.title} sx={{ p: 0 }}>
                  <ListItemButton disableGutters onClick={() => push(item.to)}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <BugIcon />
                    </ListItemIcon>
                    <Typography>{item.title}</Typography>
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
          {/* <Box display="flex" justifyContent="space-between" alignItems="center" py={{ md: 4 }} px={{ md: 6 }}> */}
          <Box py={{ md: 4 }} px={{ md: 6 }}>
            <Typography variant="h1">Заплановані тренування</Typography>
            {/* <Image src={avatar.src} alt="avatar" height={30} width={30} style={{ borderRadius: '50%' }} /> */}
          </Box>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
