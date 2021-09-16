import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useToast } from '../hooks/useToast';
import { post } from '../utils/io';
import { PasswordField } from './PasswordField';

export const LoginForm = (props: HTMLChakraProps<'form'>) => {
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('88888');

  const toast = useToast('login');
  const { replace } = useRouter();

  return (
    <chakra.form
      onSubmit={async (e) => {
        e.preventDefault();

        try {
          toast('login...');
          await post('/api/login', { username, password });
          toast('welcome!');

          replace('/');
        } catch (error) {
          toast(error.message, 'error');
        }
      }}
      maxW={80}
      marginX="auto"
      {...props}
    >
      <Stack spacing="6">
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value.trim());
            }}
            type="text"
            autoComplete="username"
            required
          />
        </FormControl>
        <PasswordField
          value={password}
          onChange={(e) => {
            setPassword(e.target.value.trim());
          }}
        />
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Sign in
        </Button>
      </Stack>
    </chakra.form>
  );
};
