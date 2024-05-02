import React from 'react'
import Select from './Select'

import {fireEvent, render} from '@testing-library/react'


const options = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "grey", label: "Grey" },
];

test('render all options passed to it', () => {
  const {getAllByRole, getByTestId} = render(<Select options={options} />)

  fireEvent.click(getByTestId("DseSelectButton"))

  expect(getAllByRole('menuitemradio')).toHaveLength(options.length);
})

test('render options using custom renderOption method if passed as prop', () => {
  const {getAllByTestId, getByTestId} = render(<Select options={options} renderOption={({option, getOptionRecommendedProps}) => {
    return <li data-testid="CustomRenderOption" {...getOptionRecommendedProps()}>{option.label}</li>
  }}/>)

  fireEvent.click(getByTestId("DseSelectButton"))

  expect(getAllByTestId('CustomRenderOption')).toHaveLength(options.length);
})

test('call the onOptionSelected prop with the selected option and its index if passed', () => {
  const onOptionSelected = jest.fn()
  const {getAllByRole, getByTestId} = render(<Select options={options} onOptionSelected={onOptionSelected} />)

  fireEvent.click(getByTestId("DseSelectButton"))

  fireEvent.click(getAllByRole("menuitemradio")[0])

  expect(onOptionSelected).toHaveBeenCalledWith(options[0], 0)
})

test('the button label change to the selected option label', () => {
  const {getAllByRole, getByTestId} = render(<Select options={options} />)

  fireEvent.click(getByTestId("DseSelectButton"))

  fireEvent.click(getAllByRole("menuitemradio")[0])

  expect(getByTestId("DseSelectButton").textContent).toBe(options[0].label)
})

test('snapshot of the selected option state', () => {
  const {getAllByRole, getByTestId, asFragment} = render(<Select options={options} />)

  fireEvent.click(getByTestId("DseSelectButton"))

  fireEvent.click(getAllByRole("menuitemradio")[0])

  expect(asFragment()).toMatchSnapshot()
})

test('snapshot of the base state', () => {
  const {asFragment} = render(<Select options={options} />)

  expect(asFragment()).toMatchSnapshot()
})

test('snapshot of the options menu open state', () => {
  const {getByTestId, asFragment} = render(<Select options={options} />)

  fireEvent.click(getByTestId("DseSelectButton"))

  expect(asFragment()).toMatchSnapshot()
})

// test('customize select label', () => {
//   const {getByText} = render(<Select options={options} label='This is a customize label'/>)

//   expect(getByText(/This is a customize label/)).toBeInTheDocument()
// })