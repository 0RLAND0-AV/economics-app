import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Dimensions } from 'react-native';
import {GradientButton} from '../../atoms/GradientButton'; // Importa el componente GradientButton

interface InputModalProps {
  visible: boolean;
  onClose: () => void;
}

const InputModal: React.FC<InputModalProps> = ({ visible, onClose }) => {
  const [montoInicial, setMontoInicial] = useState('');
  const [interes, setInteres] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [montoFinal, setMontoFinal] = useState('');

  const calculateAndClose = () => {
    calculateMissingValue();
    onClose();
  };


  const calculateMissingValue = () => {
    let missingValue = '';
    if (!montoFinal) {
      missingValue = (parseFloat(montoInicial) * Math.pow(1 + parseFloat(interes), parseFloat(periodo))).toString();
      setMontoFinal(missingValue);
    } else if (!montoInicial) {
      missingValue = (parseFloat(montoFinal) / Math.pow(1 + parseFloat(interes), parseFloat(periodo))).toString();
      setMontoInicial(missingValue);
    } else if (!interes) {
      missingValue = (Math.pow(parseFloat(montoFinal) / parseFloat(montoInicial), 1 / parseFloat(periodo)) - 1).toString();
      setInteres(missingValue);
    } else if (!periodo) {
      missingValue = (Math.log(parseFloat(montoFinal) / parseFloat(montoInicial)) / Math.log(1 + parseFloat(interes))).toString();
      setPeriodo(missingValue);
    }
    return missingValue;
  };

  const canCalculate = [montoInicial, interes, periodo, montoFinal].filter(Boolean).length === 3;

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Ingresar Datos</Text>
        <View style={styles.formContainer}>
          
          <View style={styles.formGroup}>
            <Text>Monto Inicial:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ingrese el monto inicial"
              onChangeText={setMontoInicial}
              value={montoInicial}
            />
          </View>

          <View style={styles.formGroup}>
            <Text>Interés:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ingrese el interés"
              onChangeText={setInteres}
              value={interes}
            />
          </View>

          <View style={styles.formGroup}>
            <Text>Periodo:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ingrese el periodo"
              onChangeText={setPeriodo}
              value={periodo}
            />
          </View>

          <View style={styles.formGroup}>
            <Text>Monto Final:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ingrese el monto final"
              onChangeText={setMontoFinal}
              value={montoFinal}
            />
          </View>
          
          <View style={styles.formGroup}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <GradientButton
            title="Calcular"
            onPress={calculateMissingValue}
            disabled={!canCalculate}
            style={{
              color: 'white', 
              width: 85, 
              height: 35, 
              borderColor: '#0399b0', 
              borderRadius: 10,
            }}
            color={['#0399b0', '#7ad75a']}
          />
          <GradientButton
            title="Cerrar"
            onPress={onClose}
            style={{
              color: 'white', 
              width: 85, 
              height: 35, 
              borderColor: '#0399b0', 
              borderRadius: 10,
            }}
            color={['#0399b0', '#7ad75a']}
          />
            </View>
          </View>
           

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#000',
  },
  formContainer: {
    backgroundColor: '#ACDEAA',
    padding: 20,
    borderRadius: 13,
    width: 250,  // 80% of screen width
    height: 360, // 80% of screen height
  },
  formGroup: {
    marginBottom: 10,
    color: '#000',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
});

export default InputModal;