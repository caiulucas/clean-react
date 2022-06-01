import { render, screen } from '@testing-library/react';

import { SurveyList } from '.';

describe('SurveyList page', () => {
  test('Should present four empty items on start', () => {
    render(<SurveyList />);
    const surveyList = screen.getByRole('survey-list');

    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });
});
