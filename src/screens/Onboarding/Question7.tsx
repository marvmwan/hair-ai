import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFunnel } from '../../contexts/FunnelContext';
import QuestionCard from '../../components/QuestionCard';
import MultiSelect from '../../components/MultiSelect';

const Question7 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selectedRegret, setSelectedRegret] = useState<string[]>(
    answers.barberSalonRegrets ? [answers.barberSalonRegrets] : []
  );

  const regretOptions = [
    { id: 'miscommunication', label: 'Miscommunication', emoji: '🗣️' },
    { id: 'too-short', label: 'Cut Too Short', emoji: '✂️' },
    { id: 'wrong-style', label: 'Wrong Style Choice', emoji: '💇' },
    { id: 'damaged-hair', label: 'Hair Got Damaged', emoji: '😱' },
    { id: 'maintenance', label: 'Too High Maintenance', emoji: '🔄' },
    { id: 'face-shape', label: "Didn't Suit Face Shape", emoji: '👤' },
    { id: 'no-regrets', label: 'No Major Regrets', emoji: '😊' },
  ];

  const handleContinue = () => {
    updateAnswer('barberSalonRegrets', selectedRegret[0]);
    navigation.navigate('Question8' as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="What's your biggest barber or salon regret?"
      subtitle="Help us understand what went wrong in the past"
      onContinue={handleContinue}
      onBack={handleBack}
      continueDisabled={selectedRegret.length === 0}
      progress={getProgress()}
    >
      <MultiSelect
        options={regretOptions}
        selectedValues={selectedRegret}
        onSelectionChange={setSelectedRegret}
        maxSelections={1}
      />
    </QuestionCard>
  );
};

export default Question7;