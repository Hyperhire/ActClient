import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const ActSelect = ({ register, name, errors, options }) => {
  return (
    <div>
      <TextField select fullWidth defaultValue="" inputProps={{ ...register(name) }} error={errors[name]} helperText={errors[name]?.message}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default ActSelect;
