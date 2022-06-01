import { mockSurveyModel } from '@domain/tests';
import faker from '@faker-js/faker';
import { icons } from '@presentation/components/Icon';
import { render, screen } from '@testing-library/react';

import { SurveyItem } from '.';

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyModel();
    const date = faker.date.recent();

    survey.didAnswer = true;
    survey.date = date;

    render(<SurveyItem survey={survey} />);

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
});
