import React, { useRef } from 'react';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { Box, Heading, Input, useToast, VStack } from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { compose } from '@cofe/gssp';
import { patch } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { Paper } from '@cofe/ui';
import { makeId } from '@cofe/utils';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Logo } from '@/components/Logo';
import { Root } from '@/components/Root';
import { Whoami } from '@/components/Whoami';
import { withGsspCatch } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';
import { WhoamiState } from '@/store/whoami';
import { supabase } from '@/utils/supabase';

const Profile = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const user = useStore<WhoamiState>('whoami');
  const dispatch = useDispatch();
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });
  const inputRef = useRef<HTMLInputElement>();

  return (
    <Root>
      <Header>
        <Logo />
        <Box flex={1} />
        <ColorModeSwitch />
        <Whoami />
      </Header>
      <VStack
        as={Paper}
        flex={1}
        m={4}
        p={8}
        alignItems="stretch"
        justifyContent="center"
        gridGap={2}
      >
        <Heading size="md">个人信息</Heading>
        <Form
          formData={user}
          schema={{
            type: 'object',
            properties: {
              username: {
                type: 'string',
                title: '昵称',
              },
              avatar_url: {
                type: 'string',
                title: '头像',
                // format: 'data-url',
              },
            },
            required: ['title'],
          }}
          uiSchema={{
            username: {
              'ui:widget': ({ value, onChange }) => {
                return (
                  <Input
                    defaultValue={value}
                    onChange={async (e) => {
                      const username = e.target.value.trim();

                      if (username) {
                        await patch(`/api/profiles/${user.id}`, {
                          username,
                        });

                        dispatch('UPDATE_USER')({
                          username,
                        });

                        toast({
                          title: '修改成功',
                        });
                      }
                    }}
                  />
                );
              },
            },
            avatar_url: {
              'ui:widget': ({ value, onChange }) => {
                return (
                  <Box
                    pos="relative"
                    pb="100%"
                    h={0}
                    borderRadius="md"
                    overflow="hidden"
                  >
                    <Image
                      src={value}
                      alt="头像"
                      layout="fill"
                      objectFit="cover"
                    />
                    <Box
                      pos="absolute"
                      inset={0}
                      cursor="pointer"
                      onClick={() => inputRef.current.click()}
                    >
                      <input
                        type="file"
                        ref={inputRef}
                        accept=".png"
                        style={{ display: 'none' }}
                        onChange={async (e) => {
                          // eslint-disable-next-line prefer-destructuring
                          const avatarFile = e.target.files[0];

                          if (avatarFile) {
                            const filepath = `public/${makeId()}.png`;

                            const { error } = await supabase.storage
                              .from('avatars')
                              .upload(filepath, avatarFile);

                            if (error) {
                              toast({
                                status: 'error',
                                duration: 3000,
                                position: 'bottom-left',
                              });
                            } else {
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
                          }
                        }}
                      />
                    </Box>
                  </Box>
                );
              },
            },
          }}
        />
      </VStack>
      <Footer />
    </Root>
  );
};

export const getServerSideProps = compose([
  withGsspCatch,
  withGsspWhoami,
  withGsspColorMode,
]);

export default Profile;
