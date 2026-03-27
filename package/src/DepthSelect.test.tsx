import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '@mantine-tests/core';
import { DepthSelect, DepthSelectItem } from './DepthSelect';

const TEST_DATA: DepthSelectItem[] = [
  { value: 'item-1', view: <div>Item 1</div> },
  { value: 'item-2', view: <div>Item 2</div> },
  { value: 'item-3', view: <div>Item 3</div> },
  { value: 'item-4', view: <div>Item 4</div> },
  { value: 'item-5', view: <div>Item 5</div> },
];

describe('DepthSelect', () => {
  // Rendering

  it('renders without crashing', () => {
    const { container } = render(<DepthSelect />);
    expect(container).toBeTruthy();
  });

  it('renders without crashing with data', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} />);
    expect(container).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<DepthSelect ref={ref} data={TEST_DATA} />);
    expect(ref.current).toBeTruthy();
  });

  it('renders visible cards based on visibleCards prop', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} visibleCards={3} />);
    const cards = container.querySelectorAll('[data-depth]');
    expect(cards.length).toBe(3);
  });

  it('marks first card as active', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} />);
    const activeCard = container.querySelector('[data-active]');
    expect(activeCard).toBeTruthy();
    expect(activeCard?.getAttribute('data-depth')).toBe('0');
  });

  it('assigns correct depth data attributes', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} visibleCards={4} />);
    const cards = container.querySelectorAll('[data-depth]');
    expect(cards.length).toBe(4);
    cards.forEach((card, index) => {
      expect(card.getAttribute('data-depth')).toBe(String(index));
    });
  });

  it('renders correct card when value is controlled', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} value="item-3" />);
    const activeCard = container.querySelector('[data-active]');
    expect(activeCard).toBeTruthy();
    expect(activeCard?.textContent).toBe('Item 3');
  });

  it('renders empty when data is empty', () => {
    const { container } = render(<DepthSelect data={[]} />);
    const cards = container.querySelectorAll('[data-depth]');
    expect(cards.length).toBe(0);
  });

  // Navigation — Arrow keys

  it('navigates to next item on ArrowUp key', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-1" onChange={onChange} />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith('item-2');
  });

  it('navigates to previous item on ArrowDown key', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-3" onChange={onChange} />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith('item-2');
  });

  it('does not navigate past the last item on ArrowUp', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-5" onChange={onChange} />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'ArrowUp' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not navigate before the first item on ArrowDown', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-1" onChange={onChange} />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'ArrowDown' });
    expect(onChange).not.toHaveBeenCalled();
  });

  // Navigation — Home/End keys

  it('navigates to last item on End key', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-1" onChange={onChange} />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'End' });
    expect(onChange).toHaveBeenCalledWith('item-5');
  });

  it('navigates to first item on Home key', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-4" onChange={onChange} />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith('item-1');
  });

  // Navigation — Click

  it('navigates to next item when clicking the second card', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-1" onChange={onChange} />
    );
    const secondCard = container.querySelector('[data-depth="1"]')!;
    fireEvent.click(secondCard);
    expect(onChange).toHaveBeenCalledWith('item-2');
  });

  it('does not navigate when clicking the active card', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-1" onChange={onChange} />
    );
    const activeCard = container.querySelector('[data-depth="0"]')!;
    fireEvent.click(activeCard);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not navigate when clicking cards deeper than depth 1', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-1" onChange={onChange} />
    );
    const thirdCard = container.querySelector('[data-depth="2"]')!;
    fireEvent.click(thirdCard);
    expect(onChange).not.toHaveBeenCalled();
  });

  // Accessibility

  it('has tabIndex for keyboard focus', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} />);
    const root = container.querySelector('[tabindex="0"]');
    expect(root).toBeTruthy();
  });

  it('has role="listbox" on root', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} />);
    const root = container.querySelector('[role="listbox"]');
    expect(root).toBeTruthy();
  });

  it('has role="option" on cards', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} />);
    const options = container.querySelectorAll('[role="option"]');
    expect(options.length).toBeGreaterThan(0);
  });

  it('marks active card with aria-selected=true', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} />);
    const activeCard = container.querySelector('[data-active]');
    expect(activeCard?.getAttribute('aria-selected')).toBe('true');
  });

  it('uses default aria-label', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} />);
    const root = container.querySelector('[aria-label="Depth select"]');
    expect(root).toBeTruthy();
  });

  it('supports custom aria-label', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} ariaLabel="Select a snapshot" />);
    const root = container.querySelector('[aria-label="Select a snapshot"]');
    expect(root).toBeTruthy();
  });

  // Controls sub-component

  it('renders Controls sub-component', () => {
    const { container } = render(
      <DepthSelect data={TEST_DATA}>
        <DepthSelect.Controls />
      </DepthSelect>
    );
    expect(container.querySelector('button')).toBeTruthy();
  });

  it('Controls navigate via up/down buttons', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-2" onChange={onChange}>
        <DepthSelect.Controls />
      </DepthSelect>
    );
    const buttons = container.querySelectorAll('button');
    fireEvent.click(buttons[0]);
    expect(onChange).toHaveBeenCalledWith('item-3');
  });

  it('Controls disables up button at the end', () => {
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-5">
        <DepthSelect.Controls />
      </DepthSelect>
    );
    const upButton = container.querySelector('[data-disabled]');
    expect(upButton).toBeTruthy();
  });

  it('Controls renders label via labelFormatter', () => {
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-2">
        <DepthSelect.Controls labelFormatter={(item) => `Selected: ${item.value}`} />
      </DepthSelect>
    );
    expect(container.textContent).toContain('Selected: item-2');
  });

  // Controls position

  it('sets controls-position data attribute on root', () => {
    const { container } = render(
      <DepthSelect data={TEST_DATA} controlsPosition="right">
        <DepthSelect.Controls />
      </DepthSelect>
    );
    const root = container.querySelector('[data-controls-position="right"]');
    expect(root).toBeTruthy();
  });

  it('defaults to bottom controls position', () => {
    const { container } = render(
      <DepthSelect data={TEST_DATA}>
        <DepthSelect.Controls />
      </DepthSelect>
    );
    const root = container.querySelector('[data-controls-position="bottom"]');
    expect(root).toBeTruthy();
  });
});
