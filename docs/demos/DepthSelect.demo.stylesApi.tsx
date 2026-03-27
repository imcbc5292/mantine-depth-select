import { DepthSelect } from '@gfazioli/mantine-depth-select';
import { MantineDemo } from '@mantinex/demo';
import { DepthSelectStylesApi } from '../styles-api/DepthSelect.styles-api';

const code = `
import { DepthSelect } from "@gfazioli/mantine-depth-select";
import { data } from './data';

function Demo() {
  return (
    <DepthSelect{{props}} variant="3d" label="Example Label" size="xl" />
  );
}
`;

function Demo(props: any) {
  return <DepthSelect {...props} variant="3d" label="Example Label" size="xl" />;
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: DepthSelectStylesApi,
  component: Demo,
  code,
  centered: true,
};
