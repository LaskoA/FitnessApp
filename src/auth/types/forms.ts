import { User, UserDraft } from '@app/users/types';

export interface SignUpForm {
  readonly firstName: User['firstName'];
  readonly email: User['email'];
  readonly password: string;
}

export interface SignInForm {
  readonly email: User['email'];
  readonly password: string;
}
