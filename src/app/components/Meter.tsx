import React from 'react';
import { useMeter, useNumberFormatter } from 'react-aria';

export function Meter(props) {
  let { value, minValue = 0, maxValue = 100 } = props;
  let { meterProps } = useMeter(props);

  let size = 140;
  let center = size / 2;
  let strokeWidth = 4;
  let r = center - strokeWidth;
  let c = 2 * r * Math.PI;
  let a = c * 360;
  let percentage = (value - minValue) / (maxValue - minValue);
  let offset = c - percentage * a;

  let formatter = useNumberFormatter(props.formatOptions);
  let parts = formatter.formatToParts(value);
  let valueString = parts.find(p => p.type === 'integer');
  let unit = parts.find(p => p.type === 'unit');
  console.log('parts:', valueString, unit);

  return (
    <svg
      {...meterProps}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      strokeWidth={strokeWidth}
    >
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        stroke="#ECECEC"
        // strokeOpacity={0.2}
        strokeDasharray={`${a} ${c}`}
        strokeLinecap="round"
        transform={`rotate(135 ${center} ${center})`}
      />
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        stroke="#CB4920"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(135 ${center} ${center})`}
      />
      <text
        role="presentation"
        x={center}
        y={center + 8}
        fontFamily="ui-rounded, system-ui"
        fontSize={18}
        textAnchor="middle"
        fill="#333434"
      >
        {/* {valueString.value} */}
        00 : 00 : 00
      </text>
      {/* <text
        role="presentation"
        x={center}
        y={center + 20 + 25}
        fontFamily="ui-rounded, system-ui"
        fontSize={20}
        textAnchor="middle"
        fill="dodgerblue"
        fillOpacity={0.85}
      >
        {unit.value}
      </text> */}
    </svg>
  );
}
