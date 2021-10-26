import React, { useRef } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { ArrowUpIcon } from '@cofe/icons';
import { patch } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { WhoamiState } from '@/store/whoami';
import { supabase } from '@/utils/supabase';

export const AvatarUpload = () => {
  const user = useStore<WhoamiState>('whoami');
  const dispatch = useDispatch();
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });
  const inputRef = useRef<HTMLInputElement>();

  return (
    <Box
      pos="absolute"
      inset={0}
      cursor="pointer"
      onClick={() => inputRef.current.click()}
    >
      <ArrowUpIcon
        color="whiteAlpha.700"
        boxSize={64}
        opacity={0}
        _hover={{ opacity: 1 }}
        transition="opacity 0.5s"
      />
      <input
        type="file"
        ref={inputRef}
        accept=".png"
        style={{ display: 'none' }}
        onChange={async (e) => {
          // eslint-disable-next-line prefer-destructuring
          const avatarFile = e.target.files[0];

          if (avatarFile) {
            if (avatarFile.size > 2 * 1024 * 1024) {
              toast({
                status: 'error',
                title: '图片不可大于 2MB',
                duration: 3000,
                position: 'bottom-left',
              });

              return;
            }

            const filepath = `${user.id}.png`;

            const { error: e1 } = await supabase.storage
              .from('avatars')
              .update(filepath, avatarFile);

            if (e1) {
              await supabase.storage.from('avatars').remove([filepath]);

              const { error: e2 } = await supabase.storage
                .from('avatars')
                .upload(filepath, avatarFile);

              if (e2) {
                toast({
                  status: 'error',
                  title: e2.message,
                  duration: 3000,
                  position: 'bottom-left',
                });

                return;
              }
            }

            const { publicURL } = supabase.storage
              .from('avatars')
              .getPublicUrl(filepath);

            await patch(`/api/profiles/${user.id}`, {
              avatar_url: publicURL,
            });

            dispatch('UPDATE_USER')({
              avatar_url: publicURL,
            });

            toast({
              title: '修改成功',
            });
          }
        }}
      />
    </Box>
  );
};
