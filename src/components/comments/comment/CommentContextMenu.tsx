import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React from "react";
import CommentDeleteModal from "./CommentDeleteModal";
import CommentReportModal from "./CommentReportModal";

export interface CommentContextMenuProps {
  ownerId: string;
  onReport: () => void;
  onDelete: () => void;
}

export default function CommentContextMenu({
  ownerId,
  onDelete,
  onReport,
}: CommentContextMenuProps) {
  const [currentUser] = useSession();

  const reportModalState = useDisclosure();
  const deleteModalState = useDisclosure();

  return (
    <>
      <Menu>
        <MenuButton variant="ghost" alignItems="center" as={Button} flexShrink={0}>
          <HamburgerIcon />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={reportModalState.onOpen}>Report</MenuItem>
          {currentUser?.uid === ownerId && (
            <MenuItem onClick={deleteModalState.onOpen}>Delete</MenuItem>
          )}
        </MenuList>
      </Menu>

      <Modal isOpen={deleteModalState.isOpen} onClose={deleteModalState.onClose}>
        <CommentDeleteModal
          onConfirm={() => {
            onDelete();
            deleteModalState.onClose();
          }}
        />
      </Modal>

      <Modal isOpen={reportModalState.isOpen} onClose={reportModalState.onClose}>
        <CommentReportModal
          onConfirm={() => {
            onReport();
            reportModalState.onClose();
          }}
        />
      </Modal>
    </>
  );
}
