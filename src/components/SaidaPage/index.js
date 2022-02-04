import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {Container, Title, Input} from './style';
import TokenContext from '../../contexts/TokenContext';

export default function EntradaPage(){
    const { token } = useContext(TokenContext);
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    function handleSaida(e) {
         e.preventDefault();
         const promise = axios.post("http://localhost:5000/extract", {
                value,
                description,
                type: "saida"
                , config});
           
                promise.then(response => {
                    navigate('/extract')
                });
                promise.catch(error => {
                alert(error.response.data.message)
                    setValue('');
                    setDescription('');
               });
         }
    return(
        <Container>
            <Title>
                <h1>Nova saída</h1>
            </Title>
            <form onSubmit={handleSaida}>
                <Input>
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Valor"/>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição"/>
                    <button type="submit">Salvar saída</button>
                </Input> 
            </form>
        </Container>
    );
}