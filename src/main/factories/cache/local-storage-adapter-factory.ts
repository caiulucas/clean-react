import { LocalStorageAdapter } from '@infra/cache/local-storage-adapter';

export function makeLocalStorageAdapter(): LocalStorageAdapter {
  return new LocalStorageAdapter();
}
