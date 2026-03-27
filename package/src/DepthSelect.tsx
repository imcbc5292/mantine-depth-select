import React from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  Factory,
  factory,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import classes from './DepthSelect.module.css';

export interface DepthSelectItem {
  /** Unique value identifying this item */
  value: string | number;

  /** Content rendered inside the card */
  view: React.ReactNode;
}

export type DepthSelectStylesNames = 'root' | 'stack' | 'card';

export type DepthSelectCssVariables = {
  root:
    | '--ds-transition-duration'
    | '--ds-scale-step'
    | '--ds-translate-y-step'
    | '--ds-opacity-step'
    | '--ds-blur-step'
    | '--ds-visible-cards';
};

export interface DepthSelectBaseProps {
  /** Array of items to display in the stack */
  data?: DepthSelectItem[];

  /** Controlled: currently selected value */
  value?: string | number;

  /** Uncontrolled: initial selected value (defaults to first item) */
  defaultValue?: string | number;

  /** Called when the active value changes */
  onChange?: (value: string | number) => void;

  /** Number of cards visible in the stack, @default 4 */
  visibleCards?: number;

  /** Transition duration in ms, @default 400 */
  transitionDuration?: number;

  /** Scale reduction per depth level, @default 0.06 */
  scaleStep?: number;

  /** Vertical offset per depth level in px, @default 30 */
  translateYStep?: number;

  /** Opacity reduction per depth level, @default 0.15 */
  opacityStep?: number;

  /** Blur increment per depth level in px, @default 1 */
  blurStep?: number;
}

export interface DepthSelectProps
  extends BoxProps, DepthSelectBaseProps, StylesApiProps<DepthSelectFactory> {}

export type DepthSelectFactory = Factory<{
  props: DepthSelectProps;
  ref: HTMLDivElement;
  stylesNames: DepthSelectStylesNames;
  vars: DepthSelectCssVariables;
}>;

const defaultProps: Partial<DepthSelectProps> = {
  data: [],
  visibleCards: 4,
  transitionDuration: 400,
  scaleStep: 0.06,
  translateYStep: 30,
  opacityStep: 0.15,
  blurStep: 1,
};

const varsResolver = createVarsResolver<DepthSelectFactory>(
  (
    _theme,
    { transitionDuration, scaleStep, translateYStep, opacityStep, blurStep, visibleCards }
  ) => ({
    root: {
      '--ds-transition-duration': `${transitionDuration}ms`,
      '--ds-scale-step': String(scaleStep),
      '--ds-translate-y-step': `${translateYStep}px`,
      '--ds-opacity-step': String(opacityStep),
      '--ds-blur-step': `${blurStep}px`,
      '--ds-visible-cards': String(visibleCards),
    },
  })
);

export const DepthSelect = factory<DepthSelectFactory>((_props, ref) => {
  const props = useProps('DepthSelect', defaultProps, _props);
  const {
    data,
    value,
    defaultValue,
    onChange,
    visibleCards,
    transitionDuration,
    scaleStep,
    translateYStep,
    opacityStep,
    blurStep,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,
    mod,
    ...others
  } = props;

  const getStyles = useStyles<DepthSelectFactory>({
    name: 'DepthSelect',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const items = data || [];

  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue: defaultValue ?? items[0]?.value,
    finalValue: items[0]?.value,
    onChange,
  });

  const currentIndex = items.findIndex((item) => item.value === _value);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;

  const canGoNext = activeIndex < items.length - 1;
  const canGoPrevious = activeIndex > 0;

  const goNext = () => {
    if (canGoNext) {
      handleChange(items[activeIndex + 1].value);
    }
  };

  const goPrevious = () => {
    if (canGoPrevious) {
      handleChange(items[activeIndex - 1].value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      goNext();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      goPrevious();
    }
  };

  const handleCardClick = (depth: number) => {
    if (depth === 1) {
      goNext();
    }
  };

  const visibleItems = items.slice(activeIndex, activeIndex + (visibleCards || 4));

  return (
    <Box
      ref={ref}
      {...getStyles('root')}
      {...others}
      mod={mod}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Box {...getStyles('stack')}>
        {visibleItems.map((item, depth) => {
          const cardStyle: React.CSSProperties = {
            transform: `scale(${1 - (scaleStep || 0.06) * depth}) translateY(${-(translateYStep || 30) * depth}px)`,
            opacity: 1 - (opacityStep || 0.15) * depth,
            filter: depth > 0 ? `blur(${(blurStep || 1) * depth}px)` : undefined,
            zIndex: (visibleCards || 4) - depth,
            cursor: depth === 1 ? 'pointer' : undefined,
          };

          return (
            <Box
              key={item.value}
              {...getStyles('card')}
              style={cardStyle}
              data-active={depth === 0 || undefined}
              data-depth={depth}
              onClick={depth === 1 ? () => handleCardClick(depth) : undefined}
            >
              {item.view}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});

DepthSelect.classes = classes;
DepthSelect.displayName = 'DepthSelect';
