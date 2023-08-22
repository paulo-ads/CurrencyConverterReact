import React, { useContext, useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, styled } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import InputAmount from './components/InputAmount'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { CurrencyContext } from './context/CurrencyContext'
import axios from 'axios'
import '@fontsource/raleway'
/* import './App.css' */

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext);

  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];
  const reducedResult = resultCurrency*firstAmount;  
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    if(firstAmount){
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: import.meta.env.VITE_API_KEY,
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
        .then(response => setResultCurrency(response.data.data[codeToCurrency]))
        .catch(error => console.log(error))
    }
  },[firstAmount, fromCurrency, toCurrency])

  const boxStyles = {
    background: "rgba(255, 255, 255, 0.5)",
    marginTop: "7%",
    borderRadius: 3,
    color: "#222",
    minHeight: "10em",
    padding: "2rem 1rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)",
    position: "relative",
    transition: "0.5s ease"
  }
  const TitleTypography = styled(Typography)({
    fontSize: "2.5em",
    marginBottom: "1em",
    color: "rgba(0,0,0,0.7)",
    fontWeight: "bold",
    cursor: "default"
  });
  const OutputContainer = styled(Container)({
    background: "rgba(255, 255, 255, 0.5)",
    borderRadius: 4,
    textAlign: "center",
    maxHeight: "fit-content",
    color: "#222",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)",
    position: "relative",
    transition: "0.5s ease",
    width: "fit-content",
  });
  const OutputTypography = styled(Typography)({
    marginTop: "10%",
    fontWeight: "bold",
    fontSize: "2em",
  });  
  const OutputBox = styled(Box)({
    maxWidth: "fit-content",
    transition: "0.5s ease",
  });
  const iconStyles = {
    fontSize: "2.9em",
    color: isHovered ? "#7337ff" : "rgba(0,0,0,0.7)",
    position: "relative",
    left: "140%",
    backgroundColor: isHovered ? "rgba(260,260,260,0.9)" : "transparent",
    border: "4px solid transparent",
    boxShadow: "0px 5px 10px -1px rgba(0, 0, 0, 0.1)",
    borderRadius: "100%",
    transition: "0.5s ease"
  };

  return (
    <div class="card">
      <Container maxWidth="md" sx= { boxStyles }>
      <Grid container spacing={2}>
      <Grid item xs={9}>
      <TitleTypography variant='h3'>Currency Converter</TitleTypography>
      </Grid>
      <Grid item xs={1}>
      <a target="_blank" href="https://github.com/paulo-ads/CurrencyConverterReact">
        <FontAwesomeIcon icon={faGithub} style={iconStyles} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      </a>
      </Grid>
      </Grid>
      <Grid container spacing={4}>
        <InputAmount/>
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From"/>
        <SwitchCurrency/>
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>
    </Container>
    {firstAmount ? (
      <OutputContainer>
      <OutputBox sx={{ textAlign: "left", marginTop:  "0.5rem" }}>
        <OutputTypography variant='h5'>{reducedResult.toFixed(2)} {toCurrency.split(" ")[1]}</OutputTypography>
      </OutputBox>
      </OutputContainer>
    ) : ""}
    </div>
  )
}

export default App
