import { DepthSelect } from '@gfazioli/mantine-depth-select';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group } from '@mantine/core';
import { DepthSelect } from '@gfazioli/mantine-depth-select';

function Demo() {
  return (
    <Group>
      <DepthSelect color="red" />
      <DepthSelect color="green" />
      <DepthSelect color="blue" />
      <DepthSelect color="yellow" />
      <DepthSelect color="orange" />
      <DepthSelect color="cyan" />
      <DepthSelect color="pink" />
      <DepthSelect color="violet" />
    </Group>
  );
}
`;

export const colors: MantineDemo = {
  type: 'code',
  component: () => (
    <Group>
      <DepthSelect color="red" />
      <DepthSelect color="green" />
      <DepthSelect color="blue" />
      <DepthSelect color="yellow" />
      <DepthSelect color="orange" />
      <DepthSelect color="cyan" />
      <DepthSelect color="pink" />
      <DepthSelect color="violet" />
    </Group>
  ),
  code,
  defaultExpanded: false,
};
