import { SurveyModel } from '@domain/models';
import { mockSurveyModel } from '@domain/tests';
import faker from '@faker-js/faker';
import { icons } from '@presentation/components/Icon';
import { render, screen } from '@testing-library/react';

import { SurveyItem } from '.';

function makeSut(survey = mockSurveyModel()): void {
  render(<SurveyItem survey={survey} />);
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const date = faker.date.recent();
    const survey: SurveyModel = { ...mockSurveyModel(), didAnswer: true, date };
    makeSut(survey);

    expect(screen.getByRole('icon')).toHaveProperty('src', icons.thumbUp.src);
    expect(screen.getByRole('question')).toHaveTextContent(survey.question);

    expect(screen.getByRole('day')).toHaveTextContent(
      date.getDate().toString(),
    );
    expect(screen.getByRole('month')).toHaveTextContent(
      date.toLocaleString('pt-BR', { month: 'short' }).replace('.', ''),
    );
    expect(screen.getByRole('year')).toHaveTextContent(
      date.getFullYear().toString(),
    );
  });

  test('Should render with correct values', () => {
    const date = faker.date.soon();
    const survey: SurveyModel = {
      ...mockSurveyModel(),
      didAnswer: false,
      date,
    };
    makeSut(survey);

    expect(screen.getByRole('icon')).toHaveProperty('src', icons.thumbDown.src);
    expect(screen.getByRole('question')).toHaveTextContent(survey.question);

    expect(screen.getByRole('day')).toHaveTextContent(
      date.getDate().toString().padStart(2, '0'),
    );
    expect(screen.getByRole('month')).toHaveTextContent(
      date.toLocaleString('pt-BR', { month: 'short' }).replace('.', ''),
    );
    expect(screen.getByRole('year')).toHaveTextContent(
      date.getFullYear().toString(),
    );
  });
});
