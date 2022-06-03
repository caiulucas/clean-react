import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { AccessDeniedError, UnexpectedError } from '@domain/errors';
import { AccountModel } from '@domain/models';
import { mockAccountModel, mockSurveyListModel } from '@domain/tests';
import { LoadSurveyList } from '@domain/usecases/load-survey-list';
import { ApiProvider } from '@presentation/hooks/useApi';
import { fireEvent, render, screen } from '@testing-library/react';

import { SurveyList } from '.';
class LoadSurveyListSpy {
  callsCount = 0;
  surveys = mockSurveyListModel();

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++;
    return this.surveys;
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
  history: MemoryHistory;
  setCurrentAccountMock(account: AccountModel): void;
};

function makeSut(loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();

  render(
    <ApiProvider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <Router location={history.location} navigator={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiProvider>,
  );

  return { loadSurveyListSpy, history, setCurrentAccountMock };
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

  test('Should render error on unexpected error failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();

    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error);

    makeSut(loadSurveyListSpy);

    expect(await screen.findByRole('error')).toHaveTextContent(error.message);
    expect(screen.queryByRole('survey-list')).not.toBeInTheDocument();
  });

  test('Should logout on access denied', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();

    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new AccessDeniedError());

    const { history, setCurrentAccountMock } = makeSut(loadSurveyListSpy);
    await screen.findByRole('heading');

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  test('Should render LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();

    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new UnexpectedError());

    makeSut(loadSurveyListSpy);

    fireEvent.click(await screen.findByRole('button'));
    expect(loadSurveyListSpy.callsCount).toBe(1);

    await screen.findByRole('heading');
  });
});
