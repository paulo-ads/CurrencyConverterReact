import { Grid, InputAdornment, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { CurrencyContext } from '../context/CurrencyContext'

const InputAmount = () => {
  const { firstAmount, setFirstAmount } = useContext(CurrencyContext);

  return (
    <Grid item xs={12} md>
      <TextField
        value={firstAmount}
        onChange={e => setFirstAmount(e.target.value)}
        label="Inicial Value"
        fullWidth
        InputProps={{
          type: "number",
          startAdornment: <InputAdornment position="start">$</InputAdornment>
        }}
      ></TextField>
    </Grid>
    )
}

export default InputAmount