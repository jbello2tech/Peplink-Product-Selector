import { useReducer } from 'react';
import { RecommendationResult, WizardAction, WizardAnswers, WizardState } from '@/lib/types';
import { computeRecommendations } from '@/lib/recommend';

const TOTAL_STEPS = 7;

const initialState: WizardState = {
  currentStep: 1,
  answers: {},
  isComplete: false,
  recommendations: [],
};

// Step 4 (cellularGen) is skipped when no cellular WAN is selected
function hasCellular(answers: WizardAnswers): boolean {
  return (answers.wanTypes?.some((t) => t === 'cellular_lte' || t === '5g')) ?? false;
}

function computeNextStep(currentStep: number, answers: WizardAnswers): number {
  const next = currentStep + 1;
  // Skip step 4 if no cellular
  if (next === 4 && !hasCellular(answers)) return 5;
  return next;
}

function computePrevStep(currentStep: number, answers: WizardAnswers): number {
  const prev = currentStep - 1;
  // Skip step 4 backwards if no cellular
  if (prev === 4 && !hasCellular(answers)) return 3;
  return prev;
}

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_ANSWER': {
      const { field, value } = action;
      const current = state.answers[field];

      // Handle multi-select (WANTypes array toggle)
      if (field === 'wanTypes') {
        const arr = (current as string[] | undefined) ?? [];
        const v = value as string;
        const next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
        return { ...state, answers: { ...state.answers, wanTypes: next as WizardAnswers['wanTypes'] } };
      }

      return { ...state, answers: { ...state.answers, [field]: value } };
    }

    case 'NEXT_STEP': {
      if (state.currentStep >= TOTAL_STEPS) return state;
      const nextStep = computeNextStep(state.currentStep, state.answers);
      return { ...state, currentStep: nextStep };
    }

    case 'PREV_STEP': {
      if (state.currentStep <= 1) return state;
      const prevStep = computePrevStep(state.currentStep, state.answers);
      return { ...state, currentStep: prevStep };
    }

    case 'COMPLETE_WIZARD': {
      return { ...state, isComplete: true, recommendations: action.recommendations };
    }

    case 'RESET': {
      return { ...initialState };
    }

    default:
      return state;
  }
}

export function useWizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setAnswer(field: keyof WizardAnswers, value: any) {
    dispatch({ type: 'SET_ANSWER', field, value });
  }

  function nextStep() {
    dispatch({ type: 'NEXT_STEP' });
  }

  function prevStep() {
    dispatch({ type: 'PREV_STEP' });
  }

  function complete(): RecommendationResult[] {
    const recommendations = computeRecommendations(state.answers);
    dispatch({ type: 'COMPLETE_WIZARD', recommendations });
    return recommendations;
  }

  function reset() {
    dispatch({ type: 'RESET' });
  }

  const isLastStep = state.currentStep === TOTAL_STEPS ||
    (state.currentStep === 7 && !hasCellular(state.answers) && state.currentStep === 7);

  const currentAnswer = (field: keyof WizardAnswers) => state.answers[field];

  return {
    state,
    totalSteps: TOTAL_STEPS,
    setAnswer,
    nextStep,
    prevStep,
    complete,
    reset,
    isLastStep: state.currentStep === TOTAL_STEPS,
    currentAnswer,
  };
}
