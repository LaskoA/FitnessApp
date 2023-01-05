import { useModal } from 'react-modal-hook';

import { SignInModal, SignInModalProps } from '../components/SignInModal';

export interface UseConfirmation extends Omit<SignInModalProps, 'onClose' | 'open' | 'onSubmit'> {
  readonly onClose?: (() => void) | (() => Promise<void>);
  readonly onSubmit: (() => void) | (() => Promise<void>);
}

export const useSignInModal = ({ onSubmit, title }) => {
  const [showModal, hideModal] = useModal(
    () => (
      <SignInModal
        open
        title={title}
        onClose={hideModal}
        onSubmit={onSubmit}
      />
    ),
    [],
  );

  return [showModal, hideModal];
};
