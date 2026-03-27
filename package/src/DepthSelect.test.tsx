import React from 'react';
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
});
