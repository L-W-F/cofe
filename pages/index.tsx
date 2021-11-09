import React from 'react';
import { InferGetServerSidePropsType } from 'next';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { ArrowForwardIcon } from '@cofe/icons';
import { Carousel, Paper } from '@cofe/ui';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HomeEntry } from '@/components/HomeEntry';
import { Root } from '@/components/Root';
import { Whoami } from '@/components/Whoami';
import { withGsspCatch } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';

const Index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <Root>
      <Header>
        <HomeEntry />
        <Box flex={1} />
        <ColorModeSwitch />
        <Whoami />
      </Header>
      <Flex
        as={Paper}
        flex={1}
        flexDirection="column"
        m={4}
        p={8}
        alignItems="stretch"
        justifyContent="center"
        gridGap={2}
      >
        <Heading textAlign="center">可视化应用开发</Heading>
        <Carousel autoplay my={8} pb={8}>
          <Text color="gray.500" textAlign="justify">
            {
              '通过低代码开发，不同经验水平的开发人员能够通过图形用户界面，使用拖放式组件和模型驱动逻辑来创建 Web 和移动应用。'
            }
          </Text>
          <Text color="gray.500" textAlign="justify">
            {
              '低代码开发平台减轻了非技术开发人员的压力，帮其免去了代码编写工作，同时也为专业开发人员提供了支持，帮助他们提取应用开发过程中的繁琐底层架构与基础设施任务。'
            }
          </Text>
          <Text color="gray.500" textAlign="justify">
            {
              '业务和 IT 部门的开发人员可以在平台中协同，创建、迭代和发布应用，而所需时间只是传统方法的一小部分。'
            }
          </Text>
          <Text color="gray.500" textAlign="justify">
            {
              '低代码应用开发方法可针对不同用例开发各种类型的应用，包括将原有应用升级为支持 IoT 的智能应用。'
            }
          </Text>
        </Carousel>
        <Box textAlign="center">
          <Button
            as="a"
            variant="solid"
            colorScheme="teal"
            size="lg"
            rightIcon={<ArrowForwardIcon />}
            href="/studio"
          >
            即刻体验！
          </Button>
        </Box>
      </Flex>
      <Footer />
    </Root>
  );
};

export const getServerSideProps = compose([
  withGsspCatch(),
  withGsspWhoami({ loose: true }),
  withGsspColorMode(),
]);

export default Index;
