import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFunnel } from '../../contexts/FunnelContext';
import QuestionCard from '../../components/QuestionCard';
import MultiSelect from '../../components/MultiSelect';

const Question12 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selectedAttempt, setSelectedAttempt] = useState<string[]>(
    answers.pastAttempts ? [answers.pastAttempts] : []
  );

  const attemptOptions = [
    { id: 'diy-treatments', label: 'DIY Hair Treatments', emoji: '🏠' },
    { id: 'expensive-products', label: 'Expensive Products', emoji: '💸' },
    { id: 'multiple-stylists', label: 'Multiple Stylists', emoji: '💇' },
    { id: 'youtube-tutorials', label: 'YouTube Tutorials', emoji: '📱' },
    { id: 'supplements', label: 'Hair Supplements', emoji: '💊' },
    { id: 'different-cuts', label: 'Different Haircuts', emoji: '✂️' },
    { id: 'nothing-worked', label: 'Nothing Worked', emoji: '😞' },
    { id: 'havent-tried', label: "Haven't Tried Much", emoji: '🤔' },
  ];

  const handleContinue = () => {
    updateAnswer('pastAttempts', selectedAttempt[0]);
    navigation.navigate('Question13' as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="What have you tried in the past to improve your hair?"
      subtitle="Tell us about your previous hair journey attempts"
      onContinue={handleContinue}
      onBack={handleBack}
      continueDisabled={selectedAttempt.length === 0}
      progress={getProgress()}
    >
      <MultiSelect
        options={attemptOptions}
        selectedValues={selectedAttempt}
        onSelectionChange={setSelectedAttempt}
        maxSelections={1}
      />
    </QuestionCard>
  );
};

export default Question12;