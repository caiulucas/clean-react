import faker from '@faker-js/faker';
import { fireEvent, screen } from '@testing-library/react';

export function testStatusForField(
  elementId: string,
  validationError?: string,
) {
  const wrap = screen.getByTestId(`${elementId}Wrap`);
  const field = screen.getByTestId(`${elementId}`);
  const label = screen.getByTestId(`${elementId}Label`);

  expect(wrap).toHaveAttribute(
    'data-status',
    validationError ? 'invalid' : 'valid',
  );
  expect(field).toHaveProperty('title', validationError || '');
  expect(label).toHaveProperty('title', validationError || '');
}

export function testChildCount(elementId: string, count: number) {
  expect(screen.getByTestId(elementId).children).toHaveLength(count);
}

export function populateField(elementId: string, value = faker.random.word()) {
  const input = screen.getByTestId(elementId);
  fireEvent.input(input, {
    target: { value },
  });
}
