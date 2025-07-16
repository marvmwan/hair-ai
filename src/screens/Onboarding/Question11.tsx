import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFunnel } from '../../contexts/FunnelContext';
import QuestionCard from '../../components/QuestionCard';
import MultiSelect from '../../components/MultiSelect';

const Question11 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    answers.hairGoalsDreaming || []
  );

  const goalOptions = [
    { id: 'healthier', label: 'Healthier Hair', emoji: '🌱' },
    { id: 'longer', label: 'Longer Hair', emoji: '📏' },
    { id: 'fuller', label: 'Fuller/Thicker Hair', emoji: '🦁' },
    { id: 'manageable', label: 'More Manageable', emoji: '🎯' },
    { id: 'stylish', label: 'More Stylish Looks', emoji: '✨' },
    { id: 'low-maintenance', label: 'Lower Maintenance', emoji: '⚡' },
    { id: 'color', label: 'Perfect Color', emoji: '🎨' },
    { id: 'confident', label: 'Feel More Confident', emoji: '👑' },
  ];

  const handleContinue = () => {
    updateAnswer('hairGoalsDreaming', selectedGoals);
    navigation.navigate('Question12' as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="What hair goals are you dreaming of?"
      subtitle="Select up to 2 main goals you want to achieve"
      onContinue={handleContinue}
      onBack={handleBack}
      continueDisabled={selectedGoals.length === 0}
      progress={getProgress()}
    >
      <MultiSelect
        options={goalOptions}
        selectedValues={selectedGoals}
        onSelectionChange={setSelectedGoals}
        maxSelections={2}
      />
    </QuestionCard>
  );
};

export default Question11;