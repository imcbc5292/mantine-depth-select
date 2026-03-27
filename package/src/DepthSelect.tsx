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
import { DepthSelectProvider, type DepthSelectControlsPosition } from './DepthSelect.context';
import { DepthSelectControls } from './DepthSelectControls';
import classes from './DepthSelect.module.css';

export interface DepthSelectItem {
  /** Unique value identifying this item */
  value: string | number;

  /** Content rendered inside the card */
  view: React.ReactNode;
}

export type DepthSelectStylesNames =
  | 'root'
  | 'stack'
  | 'card'
  | 'controls'
  | 'controlUp'
  | 'controlDown'
  | 'controlLabel';

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

  /** Show built-in navigation controls, @default true */
  withControls?: boolean;

  /** Position of the controls relative to the stack, @default "right" */
  controlsPosition?: DepthSelectControlsPosition;

  /** Custom formatter for the label between arrows in built-in controls */
  controlsLabelFormatter?: (item: {
    value: string | number;
    view: React.ReactNode;
  }) => React.ReactNode;

  /** Transition duration in ms, @default 400 */
  transitionDuration?: number;

  /** Scale reduction per depth level, @default 0.1 */
  scaleStep?: number;

  /** Vertical offset per depth level in px, @default 30 */
  translateYStep?: number;

  /** Opacity reduction per depth level, @default 0.15 */
  opacityStep?: number;

  /** Blur increment per depth level in px, @default 1 */
  blurStep?: number;

  /** Accessible label for the component, @default "Depth select" */
  ariaLabel?: string;

  /** Content rendered inside the component */
  children?: React.ReactNode;
}

export interface DepthSelectProps
  extends BoxProps, DepthSelectBaseProps, StylesApiProps<DepthSelectFactory> {}

export type DepthSelectFactory = Factory<{
  props: DepthSelectProps;
  ref: HTMLDivElement;
  stylesNames: DepthSelectStylesNames;
  vars: DepthSelectCssVariables;
  staticComponents: {
    Controls: typeof DepthSelectControls;
  };
}>;

const defaultProps: Partial<DepthSelectProps> = {
  data: [],
  visibleCards: 4,
  withControls: true,
  controlsPosition: 'right',
  transitionDuration: 400,
  scaleStep: 0.1,
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

function getCardStyle(
  relativeIndex: number,
  maxVisible: number,
  scaleStep: number,
  translateYStep: number,
  opacityStep: number,
  blurStep: number
): React.CSSProperties {
  if (relativeIndex < 0) {
    return {
      transform: `scale(${1 + scaleStep * 2}) translateY(${translateYStep * 2}px)`,
      opacity: 0,
      filter: `blur(${blurStep * 2}px)`,
      zIndex: maxVisible + 1,
      pointerEvents: 'none',
    };
  }

  if (relativeIndex < maxVisible) {
    return {
      transform: `scale(${1 - scaleStep * relativeIndex}) translateY(${-translateYStep * relativeIndex}px)`,
      opacity: 1 - opacityStep * relativeIndex,
      filter: relativeIndex > 0 ? `blur(${blurStep * relativeIndex}px)` : undefined,
      zIndex: maxVisible - relativeIndex,
      cursor: relativeIndex === 1 ? 'pointer' : undefined,
      pointerEvents: relativeIndex > 1 ? 'none' : undefined,
    };
  }

  return {
    transform: `scale(${1 - scaleStep * maxVisible}) translateY(${-translateYStep * maxVisible}px)`,
    opacity: 0,
    filter: `blur(${blurStep * maxVisible}px)`,
    zIndex: 0,
    pointerEvents: 'none',
  };
}

export const DepthSelect = factory<DepthSelectFactory>((_props, ref) => {
  const props = useProps('DepthSelect', defaultProps, _props);
  const {
    data,
    value,
    defaultValue,
    onChange,
    visibleCards,
    withControls,
    controlsPosition,
    controlsLabelFormatter,
    transitionDuration,
    scaleStep,
    translateYStep,
    opacityStep,
    blurStep,
    ariaLabel,
    children,
    w,
    h,

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
  const maxVisible = visibleCards || 4;
  const _scaleStep = scaleStep || 0.1;
  const _translateYStep = translateYStep || 30;
  const _opacityStep = opacityStep || 0.15;
  const _blurStep = blurStep || 1;

  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue: defaultValue ?? items[0]?.value,
    finalValue: items[0]?.value,
    onChange,
  });

  const currentIndex = items.findIndex((item) => item.value === _value);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;
  const activeItem = items[activeIndex];

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

  const goFirst = () => {
    if (items.length > 0) {
      handleChange(items[0].value);
    }
  };

  const goLast = () => {
    if (items.length > 0) {
      handleChange(items[items.length - 1].value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        goNext();
        break;
      case 'ArrowDown':
        event.preventDefault();
        goPrevious();
        break;
      case 'Home':
        event.preventDefault();
        goFirst();
        break;
      case 'End':
        event.preventDefault();
        goLast();
        break;
    }
  };

  return (
    <DepthSelectProvider
      value={{
        getStyles,
        activeItem,
        activeIndex,
        items,
        canGoNext,
        canGoPrevious,
        goNext,
        goPrevious,
        controlsPosition: controlsPosition || 'right',
      }}
    >
      <Box
        ref={ref}
        {...getStyles('root')}
        {...others}
        mod={[{ 'controls-position': controlsPosition }, mod]}
        tabIndex={0}
        role="listbox"
        aria-label={ariaLabel || 'Depth select'}
        aria-activedescendant={activeItem ? `ds-item-${activeItem.value}` : undefined}
        onKeyDown={handleKeyDown}
      >
        <Box {...getStyles('stack')} w={w} h={h}>
          {items.map((item, itemIndex) => {
            const relativeIndex = itemIndex - activeIndex;
            const cardStyle = getCardStyle(
              relativeIndex,
              maxVisible,
              _scaleStep,
              _translateYStep,
              _opacityStep,
              _blurStep
            );

            return (
              <Box
                key={item.value}
                id={`ds-item-${item.value}`}
                {...getStyles('card')}
                style={cardStyle}
                role="option"
                aria-selected={relativeIndex === 0}
                aria-hidden={relativeIndex !== 0 || undefined}
                data-active={relativeIndex === 0 || undefined}
                data-depth={relativeIndex >= 0 ? relativeIndex : undefined}
                data-exited={relativeIndex < 0 || undefined}
                onClick={relativeIndex === 1 ? goNext : undefined}
              >
                {item.view}
              </Box>
            );
          })}
        </Box>
        {withControls && <DepthSelectControls labelFormatter={controlsLabelFormatter} />}
        {children}
      </Box>
    </DepthSelectProvider>
  );
});

DepthSelect.classes = classes;
DepthSelect.displayName = 'DepthSelect';
DepthSelect.Controls = DepthSelectControls;
