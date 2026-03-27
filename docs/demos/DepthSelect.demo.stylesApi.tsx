import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { Card, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { DepthSelectStylesApi } from '../styles-api/DepthSelect.styles-api';

const ITEMS: DepthSelectItem[] = [
  {
    value: 'snap-1',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Title order={4}>Snapshot 1</Title>
        <Text size="sm" c="dimmed">
          Today
        </Text>
      </Card>
    ),
  },
  {
    value: 'snap-2',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Title order={4}>Snapshot 2</Title>
        <Text size="sm" c="dimmed">
          Yesterday
        </Text>
      </Card>
    ),
  },
  {
    value: 'snap-3',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Title order={4}>Snapshot 3</Title>
        <Text size="sm" c="dimmed">
          2 days ago
        </Text>
      </Card>
    ),
  },
];

const code = `
import { Card, Text, Title } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const data: DepthSelectItem[] = [
  { value: 'snap-1', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 1</Title></Card> },
  { value: 'snap-2', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 2</Title></Card> },
  { value: 'snap-3', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 3</Title></Card> },
];

function Demo() {
  return (
    <DepthSelect{{props}} data={data} w={400} h={400} />
  );
}
`;

function Demo(props: any) {
  return <DepthSelect {...props} data={ITEMS} w={400} h={400} />;
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: DepthSelectStylesApi,
  component: Demo,
  code,
  centered: true,
};
