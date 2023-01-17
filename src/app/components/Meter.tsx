import { useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { useMeter } from 'react-aria';

import { Exercise } from '@app/queries/types';

export interface MeterProps {
  readonly value: number | undefined;
  readonly item?: Partial<Exercise> | undefined;
  readonly timer: number;
  readonly reset: () => void;
}

export const Meter = ({ value, item, timer, reset }: MeterProps) => {
  const { palette } = useTheme();

  const maxValue = useMemo(() => {
    const time = item.timePerRep * item.reps * item.sets;
    if (time === timer) {
      reset();
    }
    if (value && item) {
      return time;
    }
  }, [value, item, reset]);


  const { meterProps } = useMeter({ value, maxValue, 'aria-label': 'time' });

  const meter = useMemo(() => {
    const size = 140;
    const center = size / 2;
    const strokeWidth = 4;
    const r = center - strokeWidth;
    const c = 2 * r * Math.PI;
    const a = c;
    const percentage = value ? value / maxValue : 0;
    const offset = percentage ? c - percentage * a : 0;

    return { size, center, strokeWidth, r, c, a, percentage, offset };
  }, [value]);

  return (
    <svg
      {...meterProps}
      width={meter.size}
      height={meter.size}
      viewBox={`0 0 ${meter.size} ${meter.size}`}
      fill="none"
      strokeWidth={meter.strokeWidth}
    >
      <circle
        role="presentation"
        cx={meter.center}
        cy={meter.center}
        r={meter.r}
        stroke={palette.grey[100]}
        strokeDasharray={`${meter.a} ${meter.c}`}
        strokeLinecap="round"
        transform={`rotate(270 ${meter.center} ${meter.center})`}
      />
      <circle
        style={{ transition: 'all 1s ease-out' }}
        role="presentation"
        cx={meter.center}
        cy={meter.center}
        r={meter.r}
        stroke={palette.secondary.main}
        strokeDasharray={meter.c}
        strokeDashoffset={timer === 0 ? meter.c : meter.offset}
        strokeLinecap="round"
        transform={`rotate(270 ${meter.center} ${meter.center})`}
      />
      <text
        role="presentation"
        x={meter.center}
        y={meter.center + 8}
        fontFamily="ui-rounded, system-ui"
        fontSize={18}
        color={palette.common.black}
        textAnchor="middle"
        fill={palette.grey[900]}
      >
        {/* TODO: upgrade to exercise time */}
        {("0" + Math.floor((timer / 60000) % 60)).slice(-2)}:
        {("0" + Math.floor((timer / 1000) % 60)).slice(-2)}:
        {("0" + ((timer / 10) % 100)).slice(-2)}
      </text>
    </svg>
  );
}
