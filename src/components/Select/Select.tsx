import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as BasicSelect
} from '@mui/material'
import { FC, forwardRef, useId } from 'react'
import SelectCheckbox from './SelectCheckbox'
import { Props } from './types'

const Select: FC<Props> = forwardRef<FC, Props>(
  (
    { checkboxes, label, data = [], fullWidth = true, children, error, ...props },
    ref
  ) => {
    const id = useId()
    const labelId = `label-${id}`

    const newProps = {
      ...props,
      label,
      labelId,
      data,
      ref
    }

    return (
      <FormControl error={!!error} fullWidth={fullWidth} size="small">
        <InputLabel id={labelId}>{label}</InputLabel>

        {checkboxes ? (
          <SelectCheckbox {...newProps} />
        ) : (
          <BasicSelect {...newProps}>
            {data.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
            {children}
          </BasicSelect>
        )}
        {!!error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    )
  }
)

Select.displayName = 'Select'

export default Select
