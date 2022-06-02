import { SurveyModel } from '@domain/models';
import { mockSurveyListModel } from '@domain/tests';
import { act, render, screen, waitFor } from '@testing-library/react';

import { SurveyList } from '.';

class LoadSurveyListSpy {
  callsCount = 0;
  surveys = mockSurveyListModel();

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return this.surveys;
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
  test('Should present four empty items on start', async () => {
    makeSut();

    expect(await screen.findAllByRole('survey-list-empty')).toHaveLength(4);
  });

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await screen.findByRole('heading');
  });

  test('Should render SurveyItems on success', async () => {
    makeSut();

    expect(await screen.findAllByRole('survey-item')).toHaveLength(3);
  });
});
