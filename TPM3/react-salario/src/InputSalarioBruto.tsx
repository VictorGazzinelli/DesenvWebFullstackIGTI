import React from 'react';
import styled from 'styled-components';

interface IProps {
    value: number;
    onChange: (event : any) => void
}

const InputSalarioBruto : React.FC<IProps> = ({value = 1045.00, onChange}) => {
    return (
        <StyledInput
            type={"number"}
            value={value}
            onChange={onChange}
            min="0"
            step="1"
        />
    );
}
  
export default InputSalarioBruto;

const StyledInput = styled.input`
    display: inline-block;
    width: 100%;
`