import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { Card, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

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
  {
    value: 'snap-4',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Title order={4}>Snapshot 4</Title>
        <Text size="sm" c="dimmed">
          3 days ago
        </Text>
      </Card>
    ),
  },
];

const code = `
import { Card, Stack, Text, Title } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const data: DepthSelectItem[] = [
  { value: 'snap-1', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 1</Title><Text size="sm" c="dimmed">Today</Text></Card> },
  { value: 'snap-2', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 2</Title><Text size="sm" c="dimmed">Yesterday</Text></Card> },
  { value: 'snap-3', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 3</Title><Text size="sm" c="dimmed">2 days ago</Text></Card> },
  { value: 'snap-4', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 4</Title><Text size="sm" c="dimmed">3 days ago</Text></Card> },
];

function Demo() {
  return (
    <Stack pt={60}>
      <DepthSelect data={data} defaultValue="snap-2" withControls={false} w={400} h={150}>
        <DepthSelect.Controls labelFormatter={(item) => String(item.value)} />
      </DepthSelect>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack pt={60}>
      <DepthSelect data={ITEMS} defaultValue="snap-2" withControls={false} w={400} h={150}>
        <DepthSelect.Controls labelFormatter={(item) => String(item.value)} />
      </DepthSelect>
    </Stack>
  );
}

export const controlsAsChildren: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
