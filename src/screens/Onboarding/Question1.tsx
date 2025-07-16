import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFunnel } from '../../contexts/FunnelContext';
import QuestionCard from '../../components/QuestionCard';
import MultiSelect from '../../components/MultiSelect';

const Question1 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selectedGender, setSelectedGender] = useState<string[]>(
    answers.gender ? [answers.gender] : []
  );

  const genderOptions = [
    { id: 'male', label: 'Male', emoji: '👨' },
    { id: 'female', label: 'Female', emoji: '👩' },
    { id: 'non-binary', label: 'Non-binary', emoji: '🧑' },
    { id: 'prefer-not-to-say', label: 'Prefer not to say', emoji: '❓' },
  ];

  const handleContinue = () => {
    updateAnswer('gender', selectedGender[0]);
    navigation.navigate('Question2' as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="What's your gender?"
      subtitle="This helps us provide personalized hair recommendations"
      onContinue={handleContinue}
      onBack={handleBack}
      continueDisabled={selectedGender.length === 0}
      progress={getProgress()}
    >
      <MultiSelect
        options={genderOptions}
        selectedValues={selectedGender}
        onSelectionChange={setSelectedGender}
        maxSelections={1}
      />
    </QuestionCard>
  );
};

export default Question1;