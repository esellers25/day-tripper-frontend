import styled from 'styled-components'

export const Button = styled.button`
background: ${props => props.secondary ? "rgb(17, 80, 59)" : "white"};
color: ${props => props.secondary ? "white" : "rgb(17, 80, 59)"};
font-size: 1em;
margin: ${props => props.secondary ? "0.25em": '0.5em' };
padding: ${props => props.secondary ? "0.25em 0.25em": "0.25em 0.5em"};
border: 3px solid #rgb(17, 80, 59);
border-radius: 3px;
&:hover {
    background: ${props => props.secondary ? "white" : 'rgb(17, 80, 59)'};
    color: ${props => props.secondary ? "rgb(17, 80, 59)" : "white"};
}
`;

export const ResetButton = styled(Button)`
height: 25px;
font-size: 0.9em;
width: 100px;
padding: 0;
margin: 0.2em;
`;

export const SmallButton = styled(Button)`
width: 200px; 
margin-top: ${props => props.secondary ? "0.4em": '1em' }
`;

export const MapButton = styled.button`
font-family: 'Asap Condensed', sans-serif;
width: 150px;
color: white;
background: rgb(49 63 165);
border-radius: 3px;
font-size: 2em;
margin-botton: 50px;
height: 45px;
`;

export const Form = styled.form`
text-align: left;
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 350px;
  height: 470px;
  border-radius: 3px;
  background-color: rgb(240, 207, 135);
  padding: 1rem;
`;

export const TrailForm = styled(Form)`
height: 600px;
padding: 1rem;
`;

export const SmallForm = styled(Form)`
height: 280px;
// justify-content: space-between;
padding: 1.3rem;
`;