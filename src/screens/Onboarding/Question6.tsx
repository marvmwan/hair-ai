import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFunnel } from '../../contexts/FunnelContext';
import QuestionCard from '../../components/QuestionCard';
import MultiSelect from '../../components/MultiSelect';

const Question6 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>(
    answers.badHairDayTriggers || []
  );

  const triggerOptions = [
    { id: 'humidity', label: 'Humidity & Weather', emoji: '🌦️' },
    { id: 'sleep', label: 'How I Slept', emoji: '😴' },
    { id: 'washing', label: 'Washing Too Often/Little', emoji: '🚿' },
    { id: 'stress', label: 'Stress Levels', emoji: '😰' },
    { id: 'hormones', label: 'Hormonal Changes', emoji: '🌙' },
    { id: 'products', label: 'Wrong Products', emoji: '🧴' },
    { id: 'touching', label: 'Touching Hair Too Much', emoji: '✋' },
    { id: 'heat', label: 'Heat Damage', emoji: '🔥' },
  ];

  const handleContinue = () => {
    updateAnswer('badHairDayTriggers', selectedTriggers);
    navigation.navigate('Question7' as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="What triggers your bad hair days?"
      subtitle="Select up to 2 main culprits behind your hair struggles"
      onContinue={handleContinue}
      onBack={handleBack}
      continueDisabled={selectedTriggers.length === 0}
      progress={getProgress()}
    >
      <MultiSelect
        options={triggerOptions}
        selectedValues={selectedTriggers}
        onSelectionChange={setSelectedTriggers}
        maxSelections={2}
      />
    </QuestionCard>
  );
};

export default Question6;