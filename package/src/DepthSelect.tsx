import React from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  getFontSize,
  getRadius,
  getSize,
  getThemeColor,
  PolymorphicFactory,
  polymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
  type MantineColor,
  type MantineRadius,
  type MantineSize,
  type StyleProp,
} from '@mantine/core';
import classes from './DepthSelect.module.css';

export type DepthSelectVariant = 'flat' | '3d';

export type DepthSelectAnimationType = 'pulse' | 'flash' | 'breathe' | 'blink' | 'glow' | 'none';

export type DepthSelectStylesNames = 'root' | 'depthSelect' | 'label' | 'light' | 'glow';

export type DepthSelectCssVariables = {
  root:
    | '--depth-select-size'
    | '--depth-select-radius'
    | '--depth-select-color'
    | '--depth-select-intensity'
    | '--depth-select-animation-duration'
    | '--depth-select-glow-size'
    | '--depth-select-justify-content';
};

export interface DepthSelectBaseProps {
  /** DepthSelect color from theme */
  color?: MantineColor;

  /** DepthSelect size */
  size?: MantineSize | (string & {}) | number;

  /** Border radius */
  radius?: MantineRadius | (string & {}) | number;

  /** Controls DepthSelect on/off state */
  value?: boolean;

  /** Light intensity (0-100) */
  intensity?: number;

  /** Enable animation */
  animate?: boolean;

  /** Animation type; one of 'pulse', 'flash', 'breathe', 'blink', 'glow', or 'none' */
  animationType?: DepthSelectAnimationType;

  /** Animation duration in seconds */
  animationDuration?: number;

  /** Label content */
  label?: React.ReactNode;

  /** Label position */
  labelPosition?: 'left' | 'right';

  /** `justify-content` CSS property */
  justify?: StyleProp<React.CSSProperties['justifyContent']>;
}

export interface DepthSelectProps
  extends BoxProps, DepthSelectBaseProps, StylesApiProps<DepthSelectFactory> {}

export type DepthSelectFactory = PolymorphicFactory<{
  props: DepthSelectProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: DepthSelectStylesNames;
  variant: DepthSelectVariant;
  vars: DepthSelectCssVariables;
}>;

const defaultProps: Partial<DepthSelectProps> = {
  color: 'green',
  size: 'sm',
  radius: 'xl',
  value: true,
  variant: 'flat',
  intensity: 80,
  animate: false,
  animationType: 'none',
  animationDuration: 1.5,
  labelPosition: 'right',
};

const varsResolver = createVarsResolver<DepthSelectFactory>(
  (theme, { size, radius, color, intensity, animationDuration, justify }) => {
    return {
      root: {
        '--depth-select-size': getSize(size, 'depth-select-size'),
        '--depth-select-radius': radius === undefined ? undefined : getRadius(radius),
        '--depth-select-color': getThemeColor(color, theme),
        '--depth-select-intensity': intensity !== undefined ? `${intensity / 100}` : '0.8',
        '--depth-select-animation-duration':
          animationDuration !== undefined ? `${animationDuration}s` : '1.5s',
        '--depth-select-glow-size': `calc(var(--depth-select-size) * 0.6)`,
        '--depth-select-justify-content': String(justify) || 'center',
      },
    };
  }
);

export const DepthSelect = polymorphicFactory<DepthSelectFactory>((_props, ref) => {
  const props = useProps('DepthSelect', defaultProps, _props);
  const {
    size,
    radius,
    color,
    intensity,
    animationDuration,
    value,
    animate,
    animationType,
    variant,
    label,
    labelPosition,
    justify,

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

  return (
    <Box
      ref={ref}
      {...getStyles('root')}
      {...others}
      mod={[{ 'label-position': labelPosition }, mod]}
      __vars={{
        '--label-fz': getFontSize(size),
        '--label-lh': getSize(size, 'label-lh'),
      }}
    >
      <Box
        {...getStyles('depthSelect')}
        variant={variant}
        data-value={value || undefined}
        data-animate={animate && value ? animationType : undefined}
      >
        <Box {...getStyles('glow')} />
        <Box {...getStyles('light')} />
      </Box>
      {label && <Box {...getStyles('label')}>{label}</Box>}
    </Box>
  );
});

DepthSelect.classes = classes;
DepthSelect.displayName = 'DepthSelect';
