import faker from '@faker-js/faker';
import { fireEvent, RenderResult } from '@testing-library/react';

export function testStatusForField(
  sut: RenderResult,
  elementId: string,
  validationError?: string,
) {
  const wrap = sut.getByTestId(`${elementId}Wrap`);
  const field = sut.getByTestId(`${elementId}`);
  const label = sut.getByTestId(`${elementId}Label`);

  expect(wrap.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid',
  );
  expect(field.title).toBe(validationError || '');
  expect(label.title).toBe(validationError || '');
}

export function testChildCount(
  sut: RenderResult,
  elementId: string,
  count: number,
) {
  const element = sut.getByTestId(elementId);
  expect(element.childElementCount).toBe(count);
}

export function populateField(
  sut: RenderResult,
  elementId: string,
  value = faker.random.word(),
) {
  const input = sut.getByTestId(elementId);
  fireEvent.input(input, {
    target: { value },
  });
}

export function testElementText(
  sut: RenderResult,
  elementId: string,
  text: string,
) {
  const element = sut.getByTestId(elementId);
  expect(element.textContent).toBe(text);
}
