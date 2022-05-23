import { makeLocalSaveAccessToken } from '@main/factories/usecases/save-access-token/local-save-access-token';
import { SignUp } from '@presentation/pages/SignUp';

import { makeLoginValidation } from './signup-validation-factory';

export function MakeLogin() {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
}
