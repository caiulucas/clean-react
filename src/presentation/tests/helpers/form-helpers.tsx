import faker from '@faker-js/faker';
import { fireEvent, screen } from '@testing-library/react';

export function testStatusForField(
  elementId: string,
  validationError?: string,
) {
  const wrap = screen.getByTestId(`${elementId}Wrap`);
  const field = screen.getByTestId(`${elementId}`);
  const label = screen.getByTestId(`${elementId}Label`);

  expect(wrap.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid',
  );
  expect(field.title).toBe(validationError || '');
  expect(label.title).toBe(validationError || '');
}

export function testChildCount(elementId: string, count: number) {
  const element = screen.getByTestId(elementId);
  expect(element.childElementCount).toBe(count);
}

export function populateField(elementId: string, value = faker.random.word()) {
  const input = screen.getByTestId(elementId);
  fireEvent.input(input, {
    target: { value },
  });
}

export function testElementText(elementId: string, text: string) {
  const element = screen.getByTestId(elementId);
  expect(element.textContent).toBe(text);
}
