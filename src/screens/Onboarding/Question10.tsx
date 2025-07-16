import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFunnel } from '../../contexts/FunnelContext';
import QuestionCard from '../../components/QuestionCard';
import MultiSelect from '../../components/MultiSelect';

const Question10 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selectedImpacts, setSelectedImpacts] = useState<string[]>(
    answers.emotionalHairImpact || []
  );

  const impactOptions = [
    { id: 'confidence', label: 'Confidence Levels', emoji: '💪' },
    { id: 'mood', label: 'Daily Mood', emoji: '😊' },
    { id: 'social', label: 'Social Interactions', emoji: '👥' },
    { id: 'productivity', label: 'Work Productivity', emoji: '📈' },
    { id: 'relationships', label: 'Romantic Relationships', emoji: '💕' },
    { id: 'self-image', label: 'Self-Image', emoji: '🪞' },
    { id: 'stress', label: 'Stress Levels', emoji: '😰' },
    { id: 'minimal', label: 'Minimal Impact', emoji: '🤷' },
  ];

  const handleContinue = () => {
    updateAnswer('emotionalHairImpact', selectedImpacts);
    navigation.navigate('Question11' as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="How does your hair impact your emotional well-being?"
      subtitle="Select up to 3 areas where hair affects your life"
      onContinue={handleContinue}
      onBack={handleBack}
      continueDisabled={selectedImpacts.length === 0}
      progress={getProgress()}
    >
      <MultiSelect
        options={impactOptions}
        selectedValues={selectedImpacts}
        onSelectionChange={setSelectedImpacts}
        maxSelections={3}
      />
    </QuestionCard>
  );
};

export default Question10;