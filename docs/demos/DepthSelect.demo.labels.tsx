import { DepthSelect } from '@gfazioli/mantine-depth-select';
import { Badge, Group, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Badge, Group, Stack } from '@mantine/core';
import { DepthSelect } from '@gfazioli/mantine-depth-select';

function Demo() {
  return (
    <Stack gap="lg">
      <Group>
        <DepthSelect label="Power" />
        <DepthSelect value={false} label="Standby" color="gray" />
      </Group>

      <Group>
        <DepthSelect label="Online" labelPosition="left" color="green" />
        <DepthSelect label="Active" labelPosition="right" color="blue" />
      </Group>

      <Group>
        <DepthSelect
          label={<Badge size="sm" variant="light">Custom Label</Badge>}
          color="violet"
        />
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack gap="lg">
      <Group>
        <DepthSelect label="Power" />
        <DepthSelect value={false} label="Standby" color="gray" />
      </Group>

      <Group>
        <DepthSelect label="Online" labelPosition="left" color="green" />
        <DepthSelect label="Active" labelPosition="right" color="blue" />
      </Group>

      <Group>
        <DepthSelect
          label={
            <Badge size="sm" variant="light">
              Custom Label
            </Badge>
          }
          color="violet"
        />
      </Group>
    </Stack>
  );
}

export const labels: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
