import { FormControl, FormHelperText, FormLabel, RadioGroup } from "@mui/material";
import { Controller } from "react-hook-form";

const RadioComp = ({
  name,
  label,
  control,
  rules,
  defaultValue,
  children,
  onChangeOvr,
  ...props
}: any) => {
  return (
    <Controller
      rules={{ required: "Select category" }}
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <FormControl error={!!error}>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
              value={value}
              row
              onChange={(e) => {
                onChange(e);
                if (onChangeOvr !== undefined) {
                  onChangeOvr(e);
                }
              }}
            >
              {children}
            </RadioGroup>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </FormControl>
        </>
      )}
    />
  );
};
export default RadioComp;
