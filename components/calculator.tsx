import { useState } from 'react'
import styles from '../styles/calculator.module.scss'
import { Container, Typography, Grid, TextField, Button } from '@material-ui/core'

export default function Calculator(){
  const [ height, setHeight ] = useState(0);
  const [ weight, setWeight ] = useState(0);
  const [ imc, setImc ] = useState(0);

  function calculateImc() {
    const heightInMeters = height/100;
    const calcImc = weight / (heightInMeters * heightInMeters)

    setImc(Number(calcImc.toFixed(2)));
  }

  function imcTable() {
    if (imc < 18.5) return (<span className={styles.abaixo}>Abaixo do Peso</span>)
    if (imc < 24.9) return (<span className={styles.normal}>Peso Normal</span>)
    if (imc < 29.9) return (<span className={styles.med}>Sobrepeso</span>)
    if (imc < 34.9) return (<span className={styles.grau1}>Obesidade Grau 1</span>)
    if (imc < 39.9) return (<span className={styles.grau2}>Obesidade Grau 2</span>)
    if (imc >= 40) return (<span className={styles.grau3}>Obesidade Grau 3</span>)  
  }

  return(
    <div className={styles.calculator}>
      <Container maxWidth="xs">
        <Grid container direction='column' spacing={2}>

          <Grid item>
            <TextField 
              label="Altura em cm"
              variant="filled"
              fullWidth
              type="number"
              onChange={ ({target}) => setHeight(Number(target.value)) }  
            />
          </Grid>
          <Grid item>
          <TextField 
              label="Peso em kg"
              variant="filled"
              fullWidth
              type="number"
              onChange={ ({target}) => setWeight(Number(target.value)) }
          />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              fullWidth
              color='primary'
              onClick={ () => calculateImc() }
            >
              Calcular
            </Button>
          </Grid>
          <div className={styles.result}>
            {
              imc === 0 ? ('') : (
                <Typography>
                  O IMC é: {imc} Kg/m² <br />
                  Classificação: { imcTable() }
                </Typography>
              )
            }
          </div>
        </Grid>
      </Container>
    </div>
  )
}