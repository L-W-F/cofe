import * as React from 'react';
import {
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@cofe/icons';

export const PasswordField = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { isOpen, onToggle } = useDisclosure();

    const inputRef = React.useRef<HTMLInputElement>(null);

    const mergeRef = useMergeRefs(inputRef, ref);

    const onClickReveal = () => {
      onToggle();

      const input = inputRef.current;

      if (input) {
        input.focus({ preventScroll: true });

        const length = input.value.length * 2;

        requestAnimationFrame(() => {
          input.setSelectionRange(length, length);
        });
      }
    };

    return (
      <InputGroup>
        <InputRightElement>
          <IconButton
            bg="transparent !important"
            variant="ghost"
            aria-label={isOpen ? '隐藏密码' : '显示密码'}
            icon={isOpen ? <ViewOffIcon /> : <ViewIcon />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          ref={mergeRef}
          name="password"
          type={isOpen ? 'text' : 'password'}
          autoComplete="current-password"
          required
          {...props}
        />
      </InputGroup>
    );
  },
);

if (process.env.NODE_ENV === 'development') {
  PasswordField.displayName = 'PasswordField';
}
