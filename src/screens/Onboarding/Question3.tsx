import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import MultiSelect from '../../components/MultiSelect';
import QuestionCard from '../../components/QuestionCard';
import { useFunnel } from '../../contexts/FunnelContext';

const Question3 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selected, setSelected] = useState<string[]>(
    answers.dailyHairConfidence ? [String(answers.dailyHairConfidence)] : []
  );

  const options = [
    { id: '1', label: 'Not confident', emoji: '😟' },
    { id: '2', label: 'Slightly confident', emoji: '😕' },
    { id: '3', label: 'Moderately confident', emoji: '😐' },
    { id: '4', label: 'Confident', emoji: '🙂' },
    { id: '5', label: 'Very confident', emoji: '😃' },
  ];

  const handleContinue = () => {
    updateAnswer('dailyHairConfidence', Number(selected[0]));
    navigation.navigate('Question4' as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="How confident do you feel about your hair on a daily basis?"
      subtitle="Rate your current hair confidence level"
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

export default Question3;