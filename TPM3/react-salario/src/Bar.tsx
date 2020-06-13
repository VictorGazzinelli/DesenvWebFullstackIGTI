import React from 'react';
import styled from 'styled-components';

interface IProps {
    value: number;
    color: string;
}

const Bar : React.FC<IProps> = ({value, color = "#222222"}) => {
    return (
        <StyledDiv 
            value={value}
            color={color}
        />
    );
}
  
export default Bar;

const StyledDiv = styled.div`
    margin-top: 40px;
    width: ${(props: IProps) => props.value + "%"};
    height: 20px;
    background-color: ${(props: IProps) => props.color};
    display: inline-block;
`