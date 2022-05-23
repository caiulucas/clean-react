import { makeRemoteAddAccount } from '@main/factories/usecases/addAccount/remote-add-account-factory';
import { makeLocalSaveAccessToken } from '@main/factories/usecases/save-access-token/local-save-access-token';
import { SignUp } from '@presentation/pages/SignUp';

import { makeSignUpValidation } from './signup-validation-factory';

export function MakeSignUp() {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
}
