import React, {useState} from 'react';
import styled from 'styled-components';
import Bar from './Bar'
import InputSalarioBruto from './InputSalarioBruto'

const calcularDescontoINSS = (base : number) : number =>{
  if(base <= 1045.00){
    return base * 0.075;    
  }
  else if(base > 1045.00 && base <= 2089.60){
    return ((base - 1045.00) * 0.09) + 78.38;    
  }
  else if(base > 2089.60 && base <=  3134.40){
    return ((base - 2089.60) * 0.12) + 78.38 + 94.01;    
  }
  else if(base > 3134.40 && base <= 6101.06){
    return ((base - 3134.40) * 0.14) + 78.38 + 94.01 + 125.37;    
  }
  else{
    return 713.10
  }
}

const calcularDescontoIRRF = (base : number) : number =>{
  if(base <= 1903.98){
    return 0;    
  }
  else if(base > 1903.98 && base <= 2826.65){
    return (base * 0.075) - 142.80;    
  }
  else if(base > 2826.65 && base <=  3751.05){
    return (base * 0.15) - 354.80;
  }
  else if(base > 3751.05 && base <= 4664.68){
    return (base * 0.225) - 636.13;
  }
  else{
    return (base * 0.275) - 869.36;
  }
}

const round = (x: number) : number => {
  return Math.ceil(x * 100.0)/100.0
}

const App : React.FC = () => {

  const [salarioBruto, setSalarioBruto] = useState(0);
  const [descontoINSS, setDescontoINSS] = useState(0);
  const [descontoIRFF, setDescontoIRFF] = useState(0);
  const [salarioLiquido, setSalarioLiquido] = useState(0);

  const onSalarioBrutoChange = (event : any) =>{
    let salarioBruto : number = round(+event.target.value);
    let descontoINSS : number = +(round(calcularDescontoINSS(salarioBruto)));
    let descontoIRFF : number = +(round(calcularDescontoIRRF(salarioBruto - descontoINSS)));
    let salarioLiquido : number = +(round(salarioBruto - descontoINSS - descontoIRFF));
    setSalarioBruto(salarioBruto);
    setDescontoINSS(descontoINSS);
    setDescontoIRFF(descontoIRFF);
    setSalarioLiquido(salarioLiquido);
    console.log({salarioBruto, descontoINSS, descontoIRFF, salarioLiquido})
    console.log(obterPorcentagem(descontoINSS,salarioBruto))
    console.log(obterPorcentagem(descontoIRFF,salarioBruto))
    console.log(obterPorcentagem(salarioLiquido,salarioBruto))
  }

  const obterPorcentagemRelativaSalarioBruto = (x : number) : number =>{
    return +((x * 100.0 /salarioBruto).toFixed(2));
  }

  const obterPorcentagem = (x : number, y: number) : number =>{
    return +((x * 100.0 /y).toFixed(2));
  }

  return (
    <Container>
      <InputSalarioBruto 
        value={salarioBruto}
        onChange={onSalarioBrutoChange}
      />
      <Bar
        value={obterPorcentagemRelativaSalarioBruto(descontoINSS)}
        color={'#e67e22'} 
      />
      <Bar
        value={obterPorcentagemRelativaSalarioBruto(descontoIRFF)}
        color={'#c0392b'}
      />
      <Bar
        value={obterPorcentagemRelativaSalarioBruto(salarioLiquido)}
        color={'#16a085'}
      />
    </Container>
  );
}

export default App;

const Container = styled.div`
  font-family: sans-serif;
  text-align: center;
  display: "flex";
  flex-direction: "row";
  align-items: "center";
  justify-content: "center;
`
