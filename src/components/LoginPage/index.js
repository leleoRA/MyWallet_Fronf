import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {Container,StyledLink, Title, Input} from './style';
import TokenContext from '../../contexts/TokenContext';

export default function LoginPage(){
    const { setToken } = useContext(TokenContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    function handleLogin(e) {
         e.preventDefault();
         const promise = axios.post("http://localhost:5000/sign-in", {
         email,
         password
         });
    
         promise.then(response => {
           setToken(response.data.token);
           navigate('/historico')
         });
         promise.catch(error => {
         alert(error.response.data.message)
             setEmail('');
             setPassword('');
        });
 }

    return(
        <Container>
            <Title>MyWallet</Title>
             <form onSubmit={handleLogin}>
                <Input>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha"/>
                <button type="submit">Entrar</button>
                </Input>
            </form>
            <StyledLink to="/cadastro">Primeira vez? Cadastre-se!</StyledLink>
        </Container>       
    );
}