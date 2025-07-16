import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import MultiSelect from '../../components/MultiSelect';
import QuestionCard from '../../components/QuestionCard';
import { useFunnel } from '../../contexts/FunnelContext';

const Question8 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selected, setSelected] = useState<string[]>(
    answers.productOverwhelm ? [String(answers.productOverwhelm)] : []
  );

  const options = [
    { id: '1', label: 'Not overwhelmed', emoji: '😌' },
    { id: '2', label: 'Slightly overwhelmed', emoji: '😐' },
    { id: '3', label: 'Somewhat overwhelmed', emoji: '😶' },
    { id: '4', label: 'Overwhelmed', emoji: '😬' },
    { id: '5', label: 'Very overwhelmed', emoji: '😱' },
  ];

  const handleContinue = () => {
    updateAnswer('productOverwhelm', Number(selected[0]));
    navigation.navigate('Question9' as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="How overwhelmed do you feel by hair product choices?"
      subtitle="Rate your level of confusion when choosing hair products"
      onContinue={handleContinue}
      onBack={handleBack}
      continueDisabled={selected.length === 0}
      progress={getProgress()}
    >
      <MultiSelect
        options={options}
        selectedValues={selected}
        onSelectionChange={setSelected}
        maxSelections={1}
      />
    </QuestionCard>
  );
};

export default Question8;