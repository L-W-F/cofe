import React, { memo } from 'react';
import { Box, Flex, Icon, Link, useColorModeValue } from '@chakra-ui/react';
import shallowEqual from 'shallowequal';
import { GithubIcon } from '../../icons/GithubIcon';
import { ColorModeSwitch } from './ColorModeSwitch';
import { DropMenu } from './DropMenu';
import { EditModeSwitch } from './EditModeSwitch';
import { InteractionIndicator } from './InteractionIndicator';
import { Logo } from './Logo';
import { UndoRedo } from './UndoRedo';

export const Header = memo(() => {
  return (
    <Flex
      as={Flex}
      px={3}
      py={1}
      bg={useColorModeValue('white', 'gray.800')}
      gridGap={3}
      alignItems="center"
      justifyItems="flex-end"
    >
      <Logo />
      <DropMenu />
      <Box flex={1} />
      <InteractionIndicator />
      <Box flex={1} />
      <UndoRedo />
      <EditModeSwitch />
      <ColorModeSwitch />
      <Link
        isExternal
        aria-label="Go to Chakra UI GitHub page"
        href="https://github.com/crossjs/cofe"
      >
        <Icon
          as={GithubIcon}
          display="block"
          transition="color 0.2s"
          w="5"
          h="5"
          _hover={{ color: 'gray.600' }}
        />
      </Link>
    </Flex>
  );
}, shallowEqual);
