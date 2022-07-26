import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";

type TVTextFieldProps = TextFieldProps & {
  name: string;
};

export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...props }) => {
  const { fieldName, defaultValue, registerField, error, clearError } =
    useField(name);

  const [value, setValue] = React.useState(defaultValue || "");

  React.useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange?.(e);
      }}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={(e) => {
        error && clearError();
        props.onKeyDown?.(e);
      }}
    />
  );
};
