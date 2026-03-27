import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { Card, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const ITEMS: DepthSelectItem[] = [
  {
    value: 'snap-1',
    view: (
      <Card shadow="sm" p="lg" withBorder>
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
      <Card shadow="sm" p="lg" withBorder>
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
      <Card shadow="sm" p="lg" withBorder>
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
      <Card shadow="sm" p="lg" withBorder>
        <Title order={4}>Snapshot 4</Title>
        <Text size="sm" c="dimmed">
          3 days ago
        </Text>
      </Card>
    ),
  },
  {
    value: 'snap-5',
    view: (
      <Card shadow="sm" p="lg" withBorder>
        <Title order={4}>Snapshot 5</Title>
        <Text size="sm" c="dimmed">
          Last week
        </Text>
      </Card>
    ),
  },
];

const code = `
import { Card, Text, Title } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const data: DepthSelectItem[] = [
  { value: 'snap-1', view: <Card shadow="sm" p="lg" withBorder><Title order={4}>Snapshot 1</Title><Text size="sm" c="dimmed">Today</Text></Card> },
  { value: 'snap-2', view: <Card shadow="sm" p="lg" withBorder><Title order={4}>Snapshot 2</Title><Text size="sm" c="dimmed">Yesterday</Text></Card> },
  { value: 'snap-3', view: <Card shadow="sm" p="lg" withBorder><Title order={4}>Snapshot 3</Title><Text size="sm" c="dimmed">2 days ago</Text></Card> },
  { value: 'snap-4', view: <Card shadow="sm" p="lg" withBorder><Title order={4}>Snapshot 4</Title><Text size="sm" c="dimmed">3 days ago</Text></Card> },
  { value: 'snap-5', view: <Card shadow="sm" p="lg" withBorder><Title order={4}>Snapshot 5</Title><Text size="sm" c="dimmed">Last week</Text></Card> },
];

function Demo() {
  return <DepthSelect{{props}} data={data} />;
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: (props: any) => <DepthSelect {...props} data={ITEMS} />,
  code,
  centered: true,
  controls: [
    {
      type: 'number',
      prop: 'visibleCards',
      initialValue: 4,
      libraryValue: 4,
      min: 1,
      max: 5,
      step: 1,
    },
    {
      type: 'number',
      prop: 'transitionDuration',
      initialValue: 400,
      libraryValue: 400,
      min: 100,
      max: 1000,
      step: 100,
    },
    {
      type: 'number',
      prop: 'scaleStep',
      initialValue: 0.06,
      libraryValue: 0.06,
      min: 0.01,
      max: 0.2,
      step: 0.01,
    },
    {
      type: 'number',
      prop: 'translateYStep',
      initialValue: 30,
      libraryValue: 30,
      min: 10,
      max: 80,
      step: 5,
    },
    {
      type: 'number',
      prop: 'opacityStep',
      initialValue: 0.15,
      libraryValue: 0.15,
      min: 0.05,
      max: 0.4,
      step: 0.05,
    },
    {
      type: 'number',
      prop: 'blurStep',
      initialValue: 1,
      libraryValue: 1,
      min: 0,
      max: 5,
      step: 0.5,
    },
  ],
};
