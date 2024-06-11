import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import globalStyles from '../../../globalStyles';
import { TouchableWithoutFeedback } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  
};

export const ResultsModal: React.FC<Props> = ({visible, onClose}) => {
    const theme = useTheme();
    const styles = getLocalStyle({theme});
  
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>RESULTADOS</Text>
            <View style={styles.resultsContainer}>
              {['Resultado:'].map((text, index) => (
                <View key={index} style={styles.row}>
                  <Text style={styles.text}>{text}</Text>
                  <Text style={styles.resultText}>aqui va el resultado</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        
      </Modal>
    );
  };
  const getLocalStyle = ({theme}: {theme: Theme}) =>
    StyleSheet.create({
      ...globalStyles,
      container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center',
      },
      modalContent: {
        backgroundColor: theme.colors.background,
        padding: 16,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 3,
          height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black', // Changed color to black
      },
      resultsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10, // Added padding
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 8,
      },
      text: {
        fontSize: 20,
        color: 'black', // Changed color to black
      },
      resultText: {
        fontSize: 18,
        color: 'black', // Changed color to black
        marginVertical: 5, // Added vertical margin to the result text
        borderColor: 'black', // Added border color to the result text
        borderWidth: 1, // Added border width to the result text
        borderRadius: 5, // Added border radius to the result text
        padding: 5, // Added padding to the result text
      },
    });