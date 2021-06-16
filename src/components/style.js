import styled from 'styled-components'

export const Button = styled.button`
background: ${props => props.secondary ? "#1E434C" : "white"};
color: ${props => props.secondary ? "white" : "#1E434C"};
font-size: 1em;
margin: ${props => props.secondary ? "0.25em": '1em' };
padding: ${props => props.secondary ? "0.25em 0.25em": "0.25em 1em"};
border: 2px solid #1e434c;
border-radius: 3px;
&:hover {
    background: ${props => props.secondary ? "white" : '#1E434C'};
    color: ${props => props.secondary ? "#1E434C" : "white"};
}
`;

export const SmallButton = styled(Button)`
width: 200px; 
margin-top: ${props => props.secondary ? "0.4em": '1em' }
`;