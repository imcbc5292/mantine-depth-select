import { createSafeContext, type GetStylesApi } from '@mantine/core';
import type { DepthSelectFactory, DepthSelectItem } from './DepthSelect';

export type DepthSelectControlsPosition = 'right' | 'left';

export interface DepthSelectContextValue {
  getStyles: GetStylesApi<DepthSelectFactory>;
  activeItem: DepthSelectItem | undefined;
  activeIndex: number;
  items: DepthSelectItem[];
  canGoNext: boolean;
  canGoPrevious: boolean;
  goNext: () => void;
  goPrevious: () => void;
  controlsPosition: DepthSelectControlsPosition;
}

export const [DepthSelectProvider, useDepthSelectContext] =
  createSafeContext<DepthSelectContextValue>('DepthSelect component was not found in the tree');
