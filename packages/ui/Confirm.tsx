import React, { cloneElement, ReactElement, ReactNode, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

export interface ConfirmProps {
  children: ReactElement;
  title: ReactNode;
  content: ReactNode;
  onConfirm: () => void;
  cancel?: ReactNode;
  confirm?: ReactNode;
}

export const Confirm = ({
  children,
  title,
  content,
  cancel = '取消',
  confirm = '删除',
  onConfirm,
}: ConfirmProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      {cloneElement(children, {
        onClick: onOpen,
      })}
      <AlertDialog
        preserveScrollBarGap
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>{content}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancel}
            </Button>
            <Button
              loadingText={typeof confirm === 'string' ? confirm : undefined}
              colorScheme="error"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              ml={3}
            >
              {confirm}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

if (process.env.NODE_ENV === 'development') {
  Confirm.displayName = 'Confirm';
}
