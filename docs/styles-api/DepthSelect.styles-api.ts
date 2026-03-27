import { DepthSelectFactory } from '@gfazioli/mantine-depth-select';
import type { StylesApiData } from '../components/styles-api.types';

export const DepthSelectStylesApi: StylesApiData<DepthSelectFactory> = {
  selectors: {
    root: 'Root element',
    depthSelect: 'DepthSelect element',
    label: 'Label element',
    glow: 'Outer glow effect element',
    light: 'Inner light reflection element',
  },

  vars: {
    root: {
      '--depth-select-size': 'Controls DepthSelect width and height',
      '--depth-select-radius': 'Controls border radius',
      '--depth-select-color': 'Controls DepthSelect base color',
      '--depth-select-intensity': 'Controls brightness intensity (0-1)',
      '--depth-select-animation-duration': 'Controls animation duration',
      '--depth-select-glow-size': 'Controls outer glow size',
      '--depth-select-justify-content': 'Controls label and DepthSelect alignment',
    },
  },

  modifiers: [
    {
      modifier: 'data-value',
      selector: 'root',
      condition: '`value` prop is true',
    },
    {
      modifier: 'data-animate',
      selector: 'root',
      value: 'pulse | flash | breathe | blink | glow',
      condition: '`animate` prop is true and `value` is true',
    },
    {
      modifier: 'data-variant',
      selector: 'root',
      value: 'flat | 3d',
      condition: 'Based on `variant` prop',
    },
  ],
};
