import { useModal } from 'react-modal-hook';

import { PlainTrainModal, PlainTrainModalProps } from '../components/PlainTrainModal';

export interface UseConfirmation extends Omit<PlainTrainModalProps, 'onClose' | 'open' | 'onSubmit'> {
  readonly onClose?: (() => void) | (() => Promise<void>);
  readonly onSubmit: (() => void) | (() => Promise<void>);
}

export const usePlainTrainModal = ({ onSubmit, title }) => {
  const [showModal, hideModal] = useModal(
    () => (
      <PlainTrainModal
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
