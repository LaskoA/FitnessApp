import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const renderOptions = (options) => {
  return options.map((option) => (
    <FormControlLabel
      key={option.value}
      value={option.value}
      control={<Radio />}
      label={option.name}
    />
  ));
};

export const FormikRadioGroup = ({
  field,
  form: { touched, errors },
  name,
  options,
  children,
  ...props
}) => {
  const fieldName = name || field.name;

  return (
    <>
      <RadioGroup
        {...field}
        {...props}
        name={fieldName}
        sx={{
          flexDirection: 'row',
        }}
      >
        {options ? renderOptions(options) : children}
      </RadioGroup>

      {touched[fieldName] && errors[fieldName] && (
        <span style={{ color: "red", fontFamily: "sans-serif" }}>
          {errors[fieldName]}
        </span>
      )}
    </>
  );
};
