import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectComp = ({
  name,
  label,
  control,
  rules,
  defaultValue,
  children,
  onChangeOvr,
  ...props
}: any) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props} fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <Select
              labelId={labelId}
              label={label}
              value={value}
              onChange={(e) => {
                onChange(e);
                if (onChangeOvr !== undefined) {
                  onChangeOvr(e);
                }
              }}
              error={!!error}
            >
              {children}
            </Select>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        )}
      />
    </FormControl>
  );
};
export default SelectComp;
