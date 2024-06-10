import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, StyleSheet, Text, View, processColor, ProcessedColorValue} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import {AddDebtModal} from './organisms';
import {ResultsModal} from './organisms/modals/ResultsModal';



import {Picker} from '@react-native-picker/picker';
import globalStyles from '../globalStyles';

import {GradientBG, GradientButton} from './atoms';
import GradientPickerItem from './atoms/GradientPickerItem';




type Props = {
  readonly navigation: NativeStackNavigationProp<any, any>;
};

export function PUCalculator({navigation}: Props): React.JSX.Element {
  const items = [
    {label: 'Diario', value: 'day'},
    {label: 'Semanal', value: 'week'},
    {label: 'Quincenal', value: 'quin'},
    {label: 'Mensual', value: 'month'},
    {label: 'Bimestral', value: 'bim'},
    {label: 'Trimestral', value: 'trim'},
    {label: 'Semestral', value: 'sem'},
    {label: 'Anual', value: 'year'},
  ];
  const [timeRateValue, setTimeRateValue] = React.useState('');
  const [resultsModalVisible, setResultsModalVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [values, setValues] = React.useState<{x: number, y: number, marker: string}[]>([]);
  const [colors, setColors] = React.useState<ProcessedColorValue[]>([]);

  const addAmount = (amount: number, type: number, period: number) => {
    const newValue = {x: period, y: amount * type, marker: String(period)};
    const newColor = processColor(type === -1 ? 'red' : 'green') as ProcessedColorValue;
    setValues(prevValues => [...prevValues, newValue]);
    setColors(prevColors => [...prevColors, newColor]);
  };
  const removeBar = () => {
    if (values.length > 0 && colors.length > 0) {
      setValues(values.slice(0, -1));
      setColors(colors.slice(0, -1));
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>ICalculatorPU</Text>
        <Text style={styles.text}>
          Calculadora de Interes Compuesto para el Pago Unico
        </Text>
        <GradientBG style={styles.picker}>
          <Picker
            selectedValue={timeRateValue}
            onValueChange={setTimeRateValue}
            mode="dropdown"
            style={styles.pickerStyle}>
            {items.map(item => (
              <GradientPickerItem
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </GradientBG>
      </View>
      <View style={styles.charts}>
        <BarChart
          style={styles.charts}
          xAxis={{
            position: 'TOP',
            drawLimitLinesBehindData: true,
            textSize: 14,
          }}
          yAxis={{
            left: {
              textSize: 14,
              zeroLine: {
                enabled: true,
                lineColor: processColor('black'),
                lineWidth: 1.5,
              },
            },
            right: {
              enabled: false,
            },
          }}
          marker={{enabled: true}}
          data={{
            dataSets: [
              {
                values,
                label: 'Deudas y Pagos',
                config: {
                  colors,
                  valueTextSize: 12,
                },
              },
            ],
            config: {
              barWidth: 0.5,
            },
          }}
          chartDescription={{text: ''}}
          legend={{textSize: 14, drawInside: true}}
          onSelect={event => {
            console.log(JSON.stringify(event.nativeEvent, null, 2));
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <GradientButton
          style={styles.button}
          title="Agregar monto"
          onPress={() => setModalVisible(true)}
        />
         <GradientButton
          style={styles.button}
          title="Eliminar Barra"
          onPress={removeBar}
        />
        <GradientButton 
          style={styles.button} 
          title="Calcular" 
          onPress={() => setResultsModalVisible(true)}
        />
        
      </View>
      <View style={styles.buttonContainer}>
        <GradientButton
          style={styles.button}
          title="Ver Ejemplos"
          onPress={() => navigation.navigate('Ejemplos')}
        />
        <GradientButton
          style={styles.button}
          title="Help"
          onPress={() => navigation.navigate('Help')}
        />
      </View>
      <AddDebtModal
          visible={modalVisible}
          onSubmit={(amount, type, period) => {
            addAmount(amount, type, period);
            setModalVisible(false);
          }}
          onClose={() => setModalVisible(false)}
        />
        <ResultsModal
        visible={resultsModalVisible}
        onClose={() => setResultsModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...globalStyles,
  charts: {
    flex: 1,
    marginVertical: 8,
    minHeight: 384,
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  chart: {
    flex: 0,
  },
  titleContainer: {
    alignItems: 'center',
    padding: 0,
  },
  picker: {
    color: 'white',
    width: 300,
    marginTop: 4,
    borderRadius: 5,
  },
  pickerStyle: {
    color: 'white',
  },
  buttonContainer: {
    margin: 8,
    
  },
});

export default PUCalculator;
