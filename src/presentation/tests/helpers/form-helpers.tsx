import { RenderResult } from '@testing-library/react';

export function testStatusForField(
  sut: RenderResult,
  elementId: string,
  validationError?: string,
) {
  const status = sut.getByTestId(`${elementId}Status`);
  expect(status.title).toBe(validationError || 'Tudo certo!');
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢');
}

export function testChildCount(
  sut: RenderResult,
  elementId: string,
  count: number,
) {
  const element = sut.getByTestId(elementId);
  expect(element.childElementCount).toBe(count);
}
