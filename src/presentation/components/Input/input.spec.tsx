import faker from '@faker-js/faker';
import { FormProvider, StateProps } from '@presentation/hooks/useForm';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { Input } from '.';

function makeSut(field: string): RenderResult {
  return render(
    <FormProvider value={{ inputErrors: {} } as StateProps}>
      <Input name={field} />
    </FormProvider>,
  );
}

describe('Input Component', () => {
  test('Should focus on input when label is clicked', () => {
    const field = faker.database.column();

    const sut = makeSut(field);
    const input = sut.getByTestId(field) as HTMLInputElement;
    const label = sut.getByTestId(`${field}Label`) as HTMLInputElement;

    fireEvent.click(label);

    expect(document.activeElement).toBe(input);
  });
});
