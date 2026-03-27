import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { Card, Group, Stack, Text, Title } from '@mantine/core';
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
];

const code = `
import { Card, Group, Stack, Text, Title } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const data: DepthSelectItem[] = [
  { value: 'snap-1', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 1</Title></Card> },
  { value: 'snap-2', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 2</Title></Card> },
  { value: 'snap-3', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 3</Title></Card> },
];

function Demo() {
  return (
    <Group justify="center" align="flex-start" gap="xl">
      <Stack align="center" gap="xs">
        <Text size="xs" c="dimmed">justify="start"</Text>
        <DepthSelect data={data} w={200} h={200}
          controlsProps={{ justify: 'start', labelFormatter: (item) => String(item.value) }}
        />
      </Stack>
      <Stack align="center" gap="xs">
        <Text size="xs" c="dimmed">justify="center" (default)</Text>
        <DepthSelect data={data} w={200} h={200}
          controlsProps={{ labelFormatter: (item) => String(item.value) }}
        />
      </Stack>
      <Stack align="center" gap="xs">
        <Text size="xs" c="dimmed">justify="end"</Text>
        <DepthSelect data={data} w={200} h={200}
          controlsProps={{ justify: 'end', labelFormatter: (item) => String(item.value) }}
        />
      </Stack>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center" align="flex-start" gap="xl" pt={40}>
      <Stack align="center" gap="xs">
        <Text size="xs" c="dimmed">
          justify=&quot;start&quot;
        </Text>
        <DepthSelect
          data={ITEMS}
          w={200}
          h={200}
          controlsProps={{ justify: 'start', labelFormatter: (item) => String(item.value) }}
        />
      </Stack>
      <Stack align="center" gap="xs">
        <Text size="xs" c="dimmed">
          justify=&quot;center&quot;
        </Text>
        <DepthSelect
          data={ITEMS}
          w={200}
          h={200}
          controlsProps={{ labelFormatter: (item) => String(item.value) }}
        />
      </Stack>
      <Stack align="center" gap="xs">
        <Text size="xs" c="dimmed">
          justify=&quot;end&quot;
        </Text>
        <DepthSelect
          data={ITEMS}
          w={200}
          h={200}
          controlsProps={{ justify: 'end', labelFormatter: (item) => String(item.value) }}
        />
      </Stack>
    </Group>
  );
}

export const controlsJustify: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
