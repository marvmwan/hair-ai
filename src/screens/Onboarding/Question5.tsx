import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFunnel } from '../../contexts/FunnelContext';
import QuestionCard from '../../components/QuestionCard';
import MultiSelect from '../../components/MultiSelect';

const Question5 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selectedFrustration, setSelectedFrustration] = useState<string[]>(
    answers.stylingFrustrations ? [answers.stylingFrustrations] : []
  );

  const frustrationOptions = [
    { id: 'takes-too-long', label: 'Takes Too Long', emoji: '⏰' },
    { id: 'looks-different', label: 'Looks Different Than Expected', emoji: '😕' },
    { id: 'falls-flat', label: 'Falls Flat Quickly', emoji: '📉' },
    { id: 'too-complicated', label: 'Too Complicated', emoji: '🤔' },
    { id: 'product-overload', label: 'Too Many Products Needed', emoji: '🧴' },
    { id: 'inconsistent', label: 'Inconsistent Results', emoji: '🎲' },
  ];

  const handleContinue = () => {
    updateAnswer('stylingFrustrations', selectedFrustration[0]);
    navigation.navigate('Question6' as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="What's your biggest styling frustration?"
      subtitle="Tell us what makes styling your hair challenging"
      onContinue={handleContinue}
      onBack={handleBack}
      continueDisabled={selectedFrustration.length === 0}
      progress={getProgress()}
    >
      <MultiSelect
        options={frustrationOptions}
        selectedValues={selectedFrustration}
        onSelectionChange={setSelectedFrustration}
        maxSelections={1}
      />
    </QuestionCard>
  );
};

export default Question5;