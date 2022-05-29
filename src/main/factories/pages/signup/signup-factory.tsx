import { makeRemoteAddAccount } from '@main/factories/usecases/addAccount/remote-add-account-factory';
import { makeLocalUpdateCurrentAccount } from '@main/factories/usecases/update-current-account/local-update-current-account';
import { SignUp } from '@presentation/pages';

import { makeSignUpValidation } from './signup-validation-factory';

export function MakeSignUp() {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
}
