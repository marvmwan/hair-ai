import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFunnel } from '../../contexts/FunnelContext';
import QuestionCard from '../../components/QuestionCard';
import MultiSelect from '../../components/MultiSelect';

const Question2 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string[]>(
    answers.ageGroup ? [answers.ageGroup] : []
  );

  const ageGroupOptions = [
    { id: '16-24', label: '16-24', emoji: '🧒' },
    { id: '25-34', label: '25-34', emoji: '👨' },
    { id: '35-44', label: '35-44', emoji: '🧑' },
    { id: '45-54', label: '45-54', emoji: '👨‍🦳' },
    { id: '55+', label: '55+', emoji: '👴' },
  ];

  const handleContinue = () => {
    updateAnswer('ageGroup', selectedAgeGroup[0]);
    navigation.navigate('Question3' as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="What's your age group?"
      subtitle="Hair needs change with age - let's find what works for you"
      onContinue={handleContinue}
      onBack={handleBack}
      continueDisabled={selectedAgeGroup.length === 0}
      progress={getProgress()}
    >
      <MultiSelect
        options={ageGroupOptions}
        selectedValues={selectedAgeGroup}
        onSelectionChange={setSelectedAgeGroup}
        maxSelections={1}
      />
    </QuestionCard>
  );
};

export default Question2;