import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

/* import { View } from 'react-native-web'; */

/* import { Container } from './styles'; */

import api from '../../services/api';

export default function Home() {
    const [marcaInput, setMarca] = useState('');
    const [modeloInput, setModelo] = useState('');
    const [anoInput, setAno] = useState('');
    const [veiculo, setVeiculo] = useState(null);

    async function handleBuscar() {
        
    /* Start Marca */
        //try {
            //Para Filtrar a MARCA
            const response  = await api.get('carros/marcas');
            console.log(response);
            const marcas = response.data;
            let marcaEncontrada = null;
            for (let i = 0; i < marcas.length; i++) {
                if (marcas[i].nome.toLowerCase() === marcaInput.toLowerCase()) {
                    marcaEncontrada = marcas[i];
                    console.log(marcaEncontrada.codigo);
                    break;
                }
            }
            console.log(marcaInput);
            /* End Marca */
            

            /* Start Modelo */
            //Para Filtrar o Modelo
            
            const res = await api.get(`carros/marcas/${marcaEncontrada.codigo}/modelos`);
            console.log(res);
            const mod = res.data.modelos;
            let modeloEncontrado = null;
            for (let i = 0; i < mod.length; i++) {
                if (mod[i].nome.substr(0, 4).toLowerCase() === modeloInput.substr(0, 4).toLowerCase()) {
                    modeloEncontrado = mod[i];
                    console.log(modeloEncontrado.codigo);
                    break;
                }
            }
            console.log(modeloInput);
            /* End Modelo */
            

        /* Start Ano */
            //Para Filtrar o Modelo
            const r = await api.get(`carros/marcas/${marcaEncontrada.codigo}/modelos/${modeloEncontrado.codigo}/anos`);
            console.log(r);
            const year = r.data;
            let anoEncontrado = null;
            for (let i = 0; i < year.length; i++) {
                if (year[i].nome.substr(0, 4).toLowerCase() === anoInput.substr(0, 4).toLowerCase()) {
                    anoEncontrado = year[i];
                    console.log(anoEncontrado.codigo);
                    break;
                }
            }
            console.log(anoInput);
        /* End Ano */

            //--
            const urlFinal = await api.get(`carros/marcas/${marcaEncontrada.codigo}/modelos/${modeloEncontrado.codigo}/anos/${anoEncontrado.codigo}`);
            
            const { status, data} = urlFinal;
            console.log(data);

            if (status != 200 || data.erro) {
                console.log('Buscar', 'Ocorreu um erro ao buscar os modelos da marcaInput.');
            } else {
                setVeiculo(data);
            }

/*        } catch (error) {
            console.log('Buscar', 'Ocorreu um erro');
        } */


    };

    async function handleLimpar() {
        setMarca('');
        setModelo('');
        setAno('');
        setVeiculo(null);
    }
    
    


    return (
        <View style={styles.container}>

            <Text style={styles.tittle}>
                Para fazer a busca, precisa preencher os três campos 
            </Text>

            {!veiculo &&
            <TextInput
                style={styles.input}
                onChangeText={setMarca}
                onSubmitEditing={handleBuscar}
                placeholder="Digite a Marca que deseja buscar"
                placeholderTextColor="#2F48D4"
                value={marcaInput}
            />}
        
            {!veiculo &&
            <TextInput
                style={styles.input}
                onChangeText={setModelo}
                onSubmitEditing={handleBuscar}
                placeholder="Digite o Modelo que deseja buscar"
                placeholderTextColor="#2F48D4"
                value={modeloInput}
            />}
        
            {!veiculo &&
            <TextInput
                style={styles.input}
                maxLength={4}
                onChangeText={setAno}
                onSubmitEditing={handleBuscar}
                placeholder="Digite o Ano que deseja buscar"
                placeholderTextColor="#2F48D4"
                value={anoInput}
            />}
            
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={veiculo ? handleLimpar : handleBuscar}>

                <Text style={styles.buttonText}>
                    {veiculo ? 'Limpar' : 'Buscar'}
                </Text>
            </TouchableOpacity>

            {veiculo && (
                <View style={styles.addressarea}>
                    <Text>
                        <Text style={styles.boldText}>Marca: </Text>
                        {veiculo.Marca}
                    </Text>
                    
                    <Text>
                        <Text style={styles.boldText}>Modelo: </Text>
                        {veiculo.Modelo}
                    </Text>

                    <Text>
                        <Text style={styles.boldText}>Ano: </Text>
                        {veiculo.AnoModelo}
                    </Text>
                    
                    <Text>
                        <Text style={styles.boldText}>Valor: </Text>
                        {veiculo.Valor}
                    </Text>

                    <Text>
                        <Text style={styles.boldText}>Combustível: </Text>
                        {veiculo.Combustivel}
                    </Text>
                </View>
            )}

        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#CCCCFF'/* '#2F48D4' */,
        flex: '1',
        padding: '20px',
      },

      tittle: {
        fontSize: '20px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      },

      input: {
        backgroundColor: '#FFF',
        borderRadius: '5px',
        color: '#2F48D4',
        fontSize: '16px',
        marginTop: '20px',
        width: '100%',
        
        height: '35px',
        padding: '10px',
      },

      button: {
        alignItems: 'center',
        backgroundColor: '#5D3FD3'/* '#F6E125' */,
        borderRadius: '5px',
        marginTop: '20px',
        padding: '8px',
        width: '100%',
      },

      buttonText: {
        color: '#fff',
        fontSize: '18px',
        fontSeight: 'bold',
        textTransform: 'uppercase',
      },

      boldText: {
        fontWeight: 'bold',
      },

      addressarea: {
        alignItems: 'left',
        marginTop: '15px',
      },
});