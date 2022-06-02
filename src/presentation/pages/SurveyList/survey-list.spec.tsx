import { UnexpectedError } from '@domain/errors';
import { SurveyModel } from '@domain/models';
import { mockSurveyListModel } from '@domain/tests';
import { render, screen } from '@testing-library/react';

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

function makeSut(loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);

  return { loadSurveyListSpy };
}

describe('SurveyList page', () => {
  test('Should present four empty items on start', async () => {
    makeSut();

    expect(await screen.findAllByRole('survey-item-empty')).toHaveLength(4);
    expect(screen.queryByRole('error')).not.toBeInTheDocument();
  });

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await screen.findByRole('heading');
  });

  test('Should render SurveyItems on success', async () => {
    makeSut();
    expect(await screen.findAllByRole('survey-item')).toHaveLength(3);
    expect(screen.queryByRole('error')).not.toBeInTheDocument();
  });

  test('Should render error on failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();

    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error);

    makeSut(loadSurveyListSpy);

    expect(await screen.findByRole('error')).toHaveTextContent(error.message);
    expect(screen.queryByRole('survey-list')).not.toBeInTheDocument();
  });
});
