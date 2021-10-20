import React, { useEffect, useRef, useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { del, subscribe } from '@cofe/io';
import { AppState } from '@/store/app';

interface DeleteAppProps {
  app: AppState[string];
  isDisabled?: boolean;
}

export const DeleteApp = ({ app, isDisabled }: DeleteAppProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    await del(`/api/apps/${app.id}`);
    onClose();
  };

  useEffect(() => {
    return subscribe((type) => {
      setIsLoading(type === 'start');
    });
  }, []);

  return (
    <>
      <IconButton
        aria-label="删除应用"
        size="xs"
        icon={<DeleteIcon />}
        variant="ghost"
        colorScheme="red"
        isDisabled={isDisabled}
        onClick={onOpen}
      />
      <AlertDialog
        preserveScrollBarGap
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            删除应用
          </AlertDialogHeader>
          <AlertDialogBody>确定删除「{app.title}」吗？</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              取消
            </Button>
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              loadingText="删除"
              colorScheme="red"
              onClick={handleDelete}
              ml={3}
            >
              删除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
