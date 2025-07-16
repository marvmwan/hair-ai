import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFunnel } from '../../contexts/FunnelContext';
import QuestionCard from '../../components/QuestionCard';
import MultiSelect from '../../components/MultiSelect';

const Question9 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selectedClash, setSelectedClash] = useState<string[]>(
    answers.lifestyleHairClashes ? [answers.lifestyleHairClashes] : []
  );

  const clashOptions = [
    { id: 'work-professional', label: 'Work/Professional Image', emoji: '👔' },
    { id: 'workout', label: 'Workout Routine', emoji: '🏃' },
    { id: 'travel', label: 'Travel Schedule', emoji: '✈️' },
    { id: 'time-constraints', label: 'Time Constraints', emoji: '⏰' },
    { id: 'budget', label: 'Budget Limitations', emoji: '💰' },
    { id: 'social-events', label: 'Social Events', emoji: '🎉' },
    { id: 'climate', label: 'Climate/Weather', emoji: '🌡️' },
    { id: 'no-clash', label: 'No Major Clashes', emoji: '✅' },
  ];

  const handleContinue = () => {
    updateAnswer('lifestyleHairClashes', selectedClash[0]);
    navigation.navigate('Question10' as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="What lifestyle factor clashes most with your hair goals?"
      subtitle="Help us understand your daily challenges"
      onContinue={handleContinue}
      onBack={handleBack}
      continueDisabled={selectedClash.length === 0}
      progress={getProgress()}
    >
      <MultiSelect
        options={clashOptions}
        selectedValues={selectedClash}
        onSelectionChange={setSelectedClash}
        maxSelections={1}
      />
    </QuestionCard>
  );
};

export default Question9;