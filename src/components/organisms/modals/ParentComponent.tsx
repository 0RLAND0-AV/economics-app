import React, { useState } from 'react';
import { View, Button } from 'react-native';
import InputModal from './InputModal';
import {ResultsModal} from './ResultsModal';

const ParentComponent = () => {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState('');

  const handleCalculate = (result: React.SetStateAction<string>) => {
    setCalculatedResult(result);
    setResultsModalVisible(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Input Modal" onPress={() => setInputModalVisible(true)} />
      
      <InputModal
        visible={inputModalVisible}
        onClose={() => setInputModalVisible(false)}
       // onCalculate={handleCalculate}
      />
      
      <ResultsModal
        visible={resultsModalVisible}
        onClose={() => setResultsModalVisible(false)}
        //result={calculatedResult}
      />
    </View>
  );
};

export default ParentComponent;
