export class UnexpectedError extends Error {
  constructor() {
    super(
      'Ops. algo que não deveria acontecer, aconteceu. Tente de novo mais tarde',
    );
    this.name = 'UnexpectedError';
  }
}
