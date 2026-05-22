import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { Wizard } from '../Wizard';

describe('Wizard', () => {
  it('renders the step label with correct text', () => {
    const { getByText } = render(
      <Wizard totalSteps={4} currentStep={2} stepName="Add Members" />,
    );

    expect(getByText('Step 2 of 4 · Add Members')).toBeTruthy();
  });

  it('renders the correct number of progress segments', () => {
    const { UNSAFE_getAllByType } = render(
      <Wizard totalSteps={4} currentStep={1} stepName="Tab Details" />,
    );

    const views = UNSAFE_getAllByType(View);
    const segments = views.filter((v) => {
      const flat = [v.props.style].flat();
      return flat.some(
        (s: Record<string, unknown>) =>
          s?.height === 5 && s?.borderRadius === 2.5,
      );
    });

    expect(segments).toHaveLength(4);
  });

  it('marks completed segments as active', () => {
    const { UNSAFE_getAllByType } = render(
      <Wizard totalSteps={4} currentStep={3} stepName="Build the Menu" />,
    );

    const views = UNSAFE_getAllByType(View);
    const activeSegments = views.filter((v) => {
      const flat = [v.props.style].flat();
      return flat.some(
        (s: Record<string, unknown>) => s?.backgroundColor === '#C9A84C',
      );
    });

    expect(activeSegments).toHaveLength(3);
  });

  it('marks remaining segments as inactive', () => {
    const { UNSAFE_getAllByType } = render(
      <Wizard totalSteps={4} currentStep={1} stepName="Tab Details" />,
    );

    const views = UNSAFE_getAllByType(View);
    const inactiveSegments = views.filter((v) => {
      const flat = [v.props.style].flat();
      return flat.some(
        (s: Record<string, unknown>) => s?.backgroundColor === '#D4C9B0',
      );
    });

    expect(inactiveSegments).toHaveLength(3);
  });

  it('marks all segments as active on the last step', () => {
    const { UNSAFE_getAllByType } = render(
      <Wizard totalSteps={3} currentStep={3} stepName="Review & Start" />,
    );

    const views = UNSAFE_getAllByType(View);
    const activeSegments = views.filter((v) => {
      const flat = [v.props.style].flat();
      return flat.some(
        (s: Record<string, unknown>) => s?.backgroundColor === '#C9A84C',
      );
    });

    expect(activeSegments).toHaveLength(3);
  });
});
