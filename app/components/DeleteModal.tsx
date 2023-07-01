import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";

interface DeleteModalProps {
  adId: string;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

function DeleteModal({ adId, isOpen, onOpen, onClose }: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete the Ad Title1</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure? You cant undo this action afterwards.
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteModal;
