import { create } from "zustand";
import {
  Modal,
  ModalContent,
  StyledBackdrop,
} from "../../components/modal/utils";

type ModalState = {
  isOpen: boolean;
  text?: string;
  update: (isOpen: boolean, text?: string) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  update: (isOpen: boolean, text?: string) => {
    set(() => ({ isOpen, text }));
  },
}));

export default function ModalUnstyled() {
  const modalState = useModal();
  const handleClose = () => modalState.update(false);

  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={modalState.isOpen}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <h2 id="unstyled-modal-title" className="modal-title">
            Question quality is too low
          </h2>
          <p id="unstyled-modal-description" className="modal-description">
            {modalState.text}
          </p>
        </ModalContent>
      </Modal>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useVoteModal = create<ModalState>((set) => ({
  isOpen: false,
  update: (isOpen: boolean, text?: string) => {
    set(() => ({ isOpen, text }));
  },
}));

export function VoteModal() {
  const modalState = useVoteModal();
  const handleClose = () => modalState.update(false);

  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={modalState.isOpen}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <h2 id="unstyled-modal-title" className="modal-title">
            {modalState.text}
          </h2>
          <p id="unstyled-modal-description" className="modal-description">
            Cool! Now you can authorize wallet in Settings and recieve bounties
          </p>
        </ModalContent>
      </Modal>
    </div>
  );
}
