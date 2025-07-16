import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFunnel } from '../../contexts/FunnelContext';
import QuestionCard from '../../components/QuestionCard';
import MultiSelect from '../../components/MultiSelect';

const Question14 = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer, getProgress } = useFunnel();
  const [selectedChoice, setSelectedChoice] = useState<string[]>(
    answers.unlockCustomFix ? [answers.unlockCustomFix] : []
  );

  const choiceOptions = [
    { id: 'scan-hair', label: 'Scan My Hair', emoji: '📸' },
    { id: 'skip-scan', label: 'Skip Hair Scan', emoji: '⏭️' },
  ];

  const handleContinue = () => {
    updateAnswer('unlockCustomFix', selectedChoice[0]);
    
    if (selectedChoice[0] === 'scan-hair') {
      navigation.navigate('HairScan' as never);
    } else {
      navigation.navigate('Loading' as never);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <QuestionCard
      title="Ready to unlock your custom hair fix?"
      subtitle="We can analyze your hair with AI or create recommendations based on your answers"
      onContinue={handleContinue}
      onBack={handleBack}
      continueDisabled={selectedChoice.length === 0}
      continueText="Continue"
      progress={getProgress()}
    >
      <MultiSelect
        options={choiceOptions}
        selectedValues={selectedChoice}
        onSelectionChange={setSelectedChoice}
        maxSelections={1}
      />
    </QuestionCard>
  );
};

export default Question14;