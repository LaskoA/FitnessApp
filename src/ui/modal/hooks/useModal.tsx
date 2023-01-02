import { useModal } from 'react-modal-hook';

import { Modal } from '../components/Modal';

export const useModalLocal = () => {
  const [showModal, hideModal] = useModal(
    () => <Modal open title="" onClose={hideModal} />,
    [],
  );

  return [showModal, hideModal];
};
