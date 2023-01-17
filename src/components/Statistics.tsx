import { Box, Typography, Button } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';

import { Meter } from '@app/app/components/Meter';
import { LeftMenu } from '@app/app/components/LeftMenu';

const item = { timePerRep: 30, reps: 1, sets: 1 };

export const Statistics = () => {
  const [timer, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const time = useMemo(() => {
    return item.timePerRep * item.reps * item.sets / 10;
  }, [item]);
  
  const reset = () => {
    setTime(0);
    setRunning(false);
  };


  useEffect(() => {
    let interval: any;

    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 1000);
    } else if (!running) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, timer]);

  return (
    <LeftMenu>
      <Box px={{ md: 6 }}>
        <Button variant="outlined" onClick={() => setRunning(!running)}>
          meter example {time}s
        </Button>
        <Meter value={timer} item={item} timer={timer} reset={() => setTimeout(() => reset(), 1000)} />
      </Box>
    </LeftMenu>
  );
};
