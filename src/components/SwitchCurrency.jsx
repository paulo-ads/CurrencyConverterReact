import { Grid, Button } from '@mui/material'
import React from 'react'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';

function SwitchCurrency() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency
  } = useContext(CurrencyContext);
  const handleSwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <Grid item xs={12} md="auto">
      <Button onClick={handleSwitch} sx={{
        borderRadius: 1.5,
        height: "100%",
        color: "rgba(0,0,0,0.7)"
      }}>
        <CompareArrowsIcon sx={{ fontSize: 30 }}/>
      </Button>
    </Grid>
    )
}

export default SwitchCurrency