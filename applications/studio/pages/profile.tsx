import React from 'react';
import { InferGetServerSidePropsType } from 'next';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { patch, post } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { Paper } from '@cofe/ui';
import { AvatarUpload } from '@/components/AvatarUpload';
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
  const { push } = useRouter();
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });

  return !user.username ? null : (
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
        <Heading size="md">基础设置</Heading>
        <FormControl id="username">
          <FormLabel>昵称</FormLabel>
          <Input
            defaultValue={user.username}
            maxLength={20}
            onBlur={async (e) => {
              const username = e.target.value.trim();

              if (username && username !== user.username) {
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
          <FormHelperText>最多 20 个字符</FormHelperText>
        </FormControl>
        <FormControl id="avatar_url">
          <FormLabel>头像</FormLabel>
          <Box pos="relative" w={64} h={64}>
            <Box
              as={NextImage}
              src={user.avatar_url}
              alt="头像"
              borderRadius="md"
              layout="fill"
              objectFit="cover"
            />
            <AvatarUpload />
          </Box>
          <FormHelperText>可以上传不大于 2MB 的 PNG 图片。</FormHelperText>
        </FormControl>
        <Heading size="md">高级设置</Heading>
        <Button
          colorScheme="red"
          onClick={async (e) => {
            try {
              await Promise.all([
                post('/api/logout', null),
                supabase.auth.signOut(),
              ]);

              dispatch('CLEAR_LOGIN')(null);

              push('/login');
            } catch (error) {}
          }}
        >
          退出登录
        </Button>
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
