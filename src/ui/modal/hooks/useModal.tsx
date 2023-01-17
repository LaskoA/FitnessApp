import { useModal as useModalReact } from 'react-modal-hook';

import { ParametersModal, ParametersModalProps } from '../components/ParametersModal';

export interface UseParametersModal extends Omit<ParametersModalProps, 'onClose' | 'open' | 'onSubmit'> {
  readonly onClose?: (() => void) | (() => Promise<void>);
  readonly onSubmit: (() => void) | (() => Promise<void>);
}

export const useParametersModal = ({ onSubmit, title }: UseParametersModal) => {
  const [showModal, hideModal] = useModalReact(
    () => (
      <ParametersModal
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
