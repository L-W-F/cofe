import React from 'react';
import Link from 'next/link';
import { Avatar, Button } from '@chakra-ui/react';
import { useStore } from '@cofe/store';
import { CofeWhoami } from '@cofe/types';

export const Whoami = () => {
  const whoami = useStore<CofeWhoami>('whoami');

  if (!whoami?.username) {
    return (
      <Link href="/login" passHref>
        <Button>Login</Button>
      </Link>
    );
  }

  return <Avatar size="xs" name={whoami.username} />;
};
