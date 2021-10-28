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
import { del } from '@cofe/io';
import { useDispatch } from '@cofe/store';
import { useIsLoading } from '@/hooks/useIsLoading';
import { AppState } from '@/store/app';

interface DeletePageProps {
  page: AppState[string]['pages'][string];
}

export const DeletePage = ({ page }: DeletePageProps) => {
  const is_loading = useIsLoading();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDelete = async () => {
    await del(`/api/pages/${page.id}`);

    onClose();
    dispatch('DELETE_PAGE')(page);
  };

  return (
    <>
      <IconButton
        aria-label="删除页面"
        size="xs"
        icon={<DeleteIcon />}
        variant="ghost"
        colorScheme="red"
        isDisabled={is_loading}
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
              isLoading={is_loading}
              isDisabled={is_loading}
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
