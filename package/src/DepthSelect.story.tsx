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
      <Title order={2}>DepthSelect — Controls Bottom (default)</Title>
      <Paper p="xl" withBorder>
        <DepthSelect data={SAMPLE_DATA}>
          <DepthSelect.Controls labelFormatter={(item) => String(item.value)} />
        </DepthSelect>
      </Paper>
    </Stack>
  );
}

export function ControlsRight() {
  return (
    <Stack gap="xl" p="md" maw={600} mx="auto">
      <Title order={2}>Controls Right (Time Machine style)</Title>
      <Paper p="xl" withBorder>
        <DepthSelect data={SAMPLE_DATA} controlsPosition="right">
          <DepthSelect.Controls labelFormatter={(item) => String(item.value)} />
        </DepthSelect>
      </Paper>
    </Stack>
  );
}

export function ControlsLeft() {
  return (
    <Stack gap="xl" p="md" maw={600} mx="auto">
      <Title order={2}>Controls Left</Title>
      <Paper p="xl" withBorder>
        <DepthSelect data={SAMPLE_DATA} controlsPosition="left">
          <DepthSelect.Controls labelFormatter={(item) => String(item.value)} />
        </DepthSelect>
      </Paper>
    </Stack>
  );
}

export function NoControls() {
  return (
    <Stack gap="xl" p="md" maw={500} mx="auto">
      <Title order={2}>No Controls (keyboard + click only)</Title>
      <Paper p="xl" withBorder>
        <DepthSelect data={SAMPLE_DATA} />
      </Paper>
    </Stack>
  );
}
