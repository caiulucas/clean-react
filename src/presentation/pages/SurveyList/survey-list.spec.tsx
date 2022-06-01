import { SurveyModel } from '@domain/models';
import { render, screen } from '@testing-library/react';

import { SurveyList } from '.';

class LoadSurveyListSpy {
  callsCount = 0;

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return [];
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

function makeSut(): SutTypes {
  const loadSurveyListSpy = new LoadSurveyListSpy();

  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);

  return { loadSurveyListSpy };
}

describe('SurveyList page', () => {
  test('Should present four empty items on start', () => {
    makeSut();
    const surveyList = screen.getByRole('survey-list');

    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });

  test('Should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});
