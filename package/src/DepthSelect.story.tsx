import React from 'react';
import { Card, Paper, Stack, Text, Title } from '@mantine/core';
import { DepthSelect, type DepthSelectItem } from './DepthSelect';

export default {
  title: 'Components/DepthSelect',
};

const SAMPLE_DATA: DepthSelectItem[] = [
  {
    value: 'snapshot-1',
    view: (
      <Card shadow="sm" padding="lg" withBorder>
        <Title order={4}>Snapshot 1 — Today</Title>
        <Text size="sm" c="dimmed">
          Most recent backup
        </Text>
        <Text mt="sm">This is the frontmost card in the stack.</Text>
      </Card>
    ),
  },
  {
    value: 'snapshot-2',
    view: (
      <Card shadow="sm" padding="lg" withBorder>
        <Title order={4}>Snapshot 2 — Yesterday</Title>
        <Text size="sm" c="dimmed">
          Previous backup
        </Text>
        <Text mt="sm">Second card in the stack.</Text>
      </Card>
    ),
  },
  {
    value: 'snapshot-3',
    view: (
      <Card shadow="sm" padding="lg" withBorder>
        <Title order={4}>Snapshot 3 — 2 days ago</Title>
        <Text size="sm" c="dimmed">
          Older backup
        </Text>
        <Text mt="sm">Third card in the stack.</Text>
      </Card>
    ),
  },
  {
    value: 'snapshot-4',
    view: (
      <Card shadow="sm" padding="lg" withBorder>
        <Title order={4}>Snapshot 4 — 3 days ago</Title>
        <Text size="sm" c="dimmed">
          Even older backup
        </Text>
        <Text mt="sm">Fourth card in the stack.</Text>
      </Card>
    ),
  },
  {
    value: 'snapshot-5',
    view: (
      <Card shadow="sm" padding="lg" withBorder>
        <Title order={4}>Snapshot 5 — Last week</Title>
        <Text size="sm" c="dimmed">
          Weekly backup
        </Text>
        <Text mt="sm">Fifth card in the stack.</Text>
      </Card>
    ),
  },
];

export function Usage() {
  return (
    <Stack gap="xl" p="md" maw={500} mx="auto">
      <Title order={2}>DepthSelect — Static 3D Stack</Title>

      <Paper p="xl" withBorder>
        <Text fw={500} mb="lg">
          Default (4 visible cards)
        </Text>
        <DepthSelect data={SAMPLE_DATA} />
      </Paper>
    </Stack>
  );
}

export function CustomSteps() {
  return (
    <Stack gap="xl" p="md" maw={500} mx="auto">
      <Paper p="xl" withBorder>
        <Text fw={500} mb="lg">
          More dramatic depth effect
        </Text>
        <DepthSelect
          data={SAMPLE_DATA}
          scaleStep={0.1}
          translateYStep={40}
          opacityStep={0.2}
          blurStep={2}
        />
      </Paper>
    </Stack>
  );
}

export function SubtleEffect() {
  return (
    <Stack gap="xl" p="md" maw={500} mx="auto">
      <Paper p="xl" withBorder>
        <Text fw={500} mb="lg">
          Subtle depth effect
        </Text>
        <DepthSelect
          data={SAMPLE_DATA}
          scaleStep={0.03}
          translateYStep={20}
          opacityStep={0.1}
          blurStep={0.5}
          visibleCards={5}
        />
      </Paper>
    </Stack>
  );
}

export function ControlledValue() {
  return (
    <Stack gap="xl" p="md" maw={500} mx="auto">
      <Paper p="xl" withBorder>
        <Text fw={500} mb="lg">
          Starting from Snapshot 3
        </Text>
        <DepthSelect data={SAMPLE_DATA} value="snapshot-3" />
      </Paper>
    </Stack>
  );
}

export function TwoCards() {
  return (
    <Stack gap="xl" p="md" maw={500} mx="auto">
      <Paper p="xl" withBorder>
        <Text fw={500} mb="lg">
          Only 2 visible cards
        </Text>
        <DepthSelect data={SAMPLE_DATA} visibleCards={2} />
      </Paper>
    </Stack>
  );
}
