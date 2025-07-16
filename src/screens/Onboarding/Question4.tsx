import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFunnel } from '../../contexts/FunnelContext';
import QuestionCard from '../../components/QuestionCard';
import MultiSelect from '../../components/MultiSelect';

const Question4 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selectedHurdles, setSelectedHurdles] = useState<string[]>(
    answers.commonHairHurdles || []
  );

  const hurdleOptions = [
    { id: 'frizz', label: 'Frizz & Flyaways', emoji: '🌪️' },
    { id: 'thinning', label: 'Thinning Hair', emoji: '📉' },
    { id: 'oily', label: 'Oily Scalp', emoji: '💧' },
    { id: 'dry', label: 'Dry & Brittle', emoji: '🏜️' },
    { id: 'dandruff', label: 'Dandruff', emoji: '❄️' },
    { id: 'styling', label: 'Hard to Style', emoji: '🤯' },
    { id: 'growth', label: 'Slow Growth', emoji: '🐌' },
    { id: 'color-damage', label: 'Color Damage', emoji: '🎨' },
  ];

  const handleContinue = () => {
    updateAnswer('commonHairHurdles', selectedHurdles);
    navigation.navigate('Question5' as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="What are your most common hair hurdles?"
      subtitle="Select up to 3 challenges you face regularly"
      onContinue={handleContinue}
      onBack={handleBack}
      continueDisabled={selectedHurdles.length === 0}
      progress={getProgress()}
    >
      <MultiSelect
        options={hurdleOptions}
        selectedValues={selectedHurdles}
        onSelectionChange={setSelectedHurdles}
        maxSelections={3}
      />
    </QuestionCard>
  );
};

export default Question4;