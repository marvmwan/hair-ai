import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import MultiSelect from '../../components/MultiSelect';
import QuestionCard from '../../components/QuestionCard';
import { useFunnel } from '../../contexts/FunnelContext';

const Question13 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selected, setSelected] = useState<string[]>(
    answers.readinessForChange ? [String(answers.readinessForChange)] : []
  );

  const options = [
    { id: '1', label: 'Not ready', emoji: '😴' },
    { id: '2', label: 'Slightly ready', emoji: '😐' },
    { id: '3', label: 'Somewhat ready', emoji: '😶' },
    { id: '4', label: 'Ready', emoji: '🙂' },
    { id: '5', label: 'Very ready', emoji: '💪' },
  ];

  const handleContinue = () => {
    updateAnswer('readinessForChange', Number(selected[0]));
    navigation.navigate('Question14' as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="How ready are you to make a change?"
      subtitle="Rate your commitment to transforming your hair routine"
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

export default Question13;