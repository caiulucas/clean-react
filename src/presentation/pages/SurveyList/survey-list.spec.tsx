import { render, screen } from '@testing-library/react';

import { SurveyList } from '.';

function makeSut(): void {
  render(<SurveyList />);
}

describe('SurveyList page', () => {
  test('Should present four empty items on start', () => {
    makeSut();
    const surveyList = screen.getByRole('survey-list');

    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });
});
