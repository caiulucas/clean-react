import { makeRemoteAddAccount } from '@main/factories/usecases/addAccount/remote-add-account-factory';
import { SignUp } from '@presentation/pages';

import { makeSignUpValidation } from './signup-validation-factory';

export function MakeSignUp() {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  );
}
