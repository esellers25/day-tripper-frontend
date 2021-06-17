import styled from 'styled-components'

export const Button = styled.button`
background: ${props => props.secondary ? "#1b4c0f" : "white"};
color: ${props => props.secondary ? "white" : "##1b4c0f"};
font-size: 1em;
margin: ${props => props.secondary ? "0.25em": '1em' };
padding: ${props => props.secondary ? "0.25em 0.25em": "0.25em 1em"};
border: 3px solid ##1b4c0f;
border-radius: 3px;
&:hover {
    background: ${props => props.secondary ? "white" : '#1b4c0f'};
    color: ${props => props.secondary ? "#1b4c0f" : "white"};
}
`;

export const SmallButton = styled(Button)`
width: 200px; 
margin-top: ${props => props.secondary ? "0.4em": '1em' }
`;

export const Form = styled.form`
text-align: left;
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 350px;
  height: 450px;
  background-color: rgb(240, 207, 135);
  padding: 0.5rem;
`;

export const TrailForm = styled(Form)`
height: 620px;
padding: 1rem;
`;