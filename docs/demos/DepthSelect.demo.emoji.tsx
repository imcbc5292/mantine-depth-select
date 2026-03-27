import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { Center, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const ITEMS: DepthSelectItem[] = [
  {
    value: '1',
    view: (
      <Center h="100%">
        <Text fz={64}>🎉</Text>
      </Center>
    ),
  },
  {
    value: '2',
    view: (
      <Center h="100%">
        <Text fz={64}>🎉🎈</Text>
      </Center>
    ),
  },
  {
    value: '3',
    view: (
      <Center h="100%">
        <Text fz={64}>🎉🎈🎁</Text>
      </Center>
    ),
  },
  {
    value: '4',
    view: (
      <Center h="100%">
        <Text fz={64}>🎉🎈🎁🎊</Text>
      </Center>
    ),
  },
];

const code = `
import { Center, Text } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const data: DepthSelectItem[] = [
  { value: '1', view: <Center h="100%"><Text fz={64}>🎉</Text></Center> },
  { value: '2', view: <Center h="100%"><Text fz={64}>🎉🎈</Text></Center> },
  { value: '3', view: <Center h="100%"><Text fz={64}>🎉🎈🎁</Text></Center> },
  { value: '4', view: <Center h="100%"><Text fz={64}>🎉🎈🎁🎊</Text></Center> },
];

function Demo() {
  return (
    <DepthSelect
      data={data}
      defaultValue="2"
      loop
      controlsProps={{ labelFormatter: (item) => \`\${item.value} emoji\` }}
      w={350}
      h={120}
    />
  );
}
`;

function Demo() {
  return (
    <Stack pt={60} pb={60}>
      <DepthSelect
        data={ITEMS}
        defaultValue="2"
        loop
        controlsProps={{ labelFormatter: (item) => `${item.value} emoji` }}
        w={350}
        h={120}
        mx="auto"
      />
    </Stack>
  );
}

export const emoji: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
