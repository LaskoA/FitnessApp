import { ChangeEvent, FC } from "react";
import { TextField, Typography, BoxProps, Box } from "@mui/material";

interface Props extends BoxProps {
  title: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const NamedTextField: FC<Props> = ({
  title,
  placeholder,
  onChange,
  ...props
}) => {
  return (
    <Box {...props}>
      <Typography variant="subtitle1" color="grey.400">
        { title }
      </Typography>

      <TextField
        type="text"
        fullWidth
        placeholder={placeholder}
        onChange={onChange}
      />
    </Box>
  );
};
