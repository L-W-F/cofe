import React, { useRef } from 'react';
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
import { DeleteIcon } from '@cofe/icons';
import { useAppActions } from '@/hooks/useApp';
import { AppState } from '@/store/app';

interface DeletePageProps {
  page: AppState['pages'][string];
}

export const DeletePage = ({ page }: DeletePageProps) => {
  const { deletePage } = useAppActions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <IconButton
        aria-label="删除页面"
        size="xs"
        icon={<DeleteIcon />}
        variant="ghost"
        colorScheme="red"
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
            删除页面
          </AlertDialogHeader>
          <AlertDialogBody>确定删除「{page.title}」吗？</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              取消
            </Button>
            <Button
              loadingText="删除"
              colorScheme="red"
              onClick={() => {
                deletePage(page);
                onClose();
              }}
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
