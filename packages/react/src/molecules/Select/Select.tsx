import React, { KeyboardEventHandler, RefObject, createRef, useEffect, useRef, useState } from "react";
import Text from "../../atoms/Text";

interface SelectOption {
  label: string;
  value: string;
}

interface RenderOptionProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => Object;
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const KEY_CODES = {
  ENTER: 13,
  SPACE: 32,
  DOWN_ARROW: 40,
  UP_ARROW: 38,
  ESC: 27,
};

const Select: React.FC<SelectProps> = ({
  options = [],
  label = "Please select an option...",
  onOptionSelected,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [overlayTop, setOverlayTop] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<null | number>();
  const [optionRefs, setOptionRefs] = useState<RefObject<HTMLLIElement>[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>();

  const labelRef = useRef<HTMLButtonElement>(null);

  const handleOptionSelected = (option: SelectOption, optionIndex: number) => {
    setIsOpen(!isOpen);
    if (onOptionSelected) {
      onOptionSelected(option, optionIndex);
    }
    setSelectedIndex(optionIndex);
    setIsOpen(false);
  };

  const handleLabelClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef?.current?.offsetHeight]);

  useEffect(() => {
    setOptionRefs(options.map((_) => createRef()));
  }, [options.length]);

  let selectedOption = null;
  if (typeof selectedIndex === "number") {
    selectedOption = options[selectedIndex];
  }

  const highlightOption = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);

    if (optionIndex !== null) {
      const ref = optionRefs[optionIndex];

      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  };

  useEffect(() => {
    if (typeof highlightedIndex === "number" && isOpen) {
      const ref = optionRefs[highlightedIndex];

      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen, highlightedIndex]);

  const handleKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault();

    if ([KEY_CODES.DOWN_ARROW, KEY_CODES.ENTER, KEY_CODES.SPACE].includes(event.keyCode)) {
      setIsOpen(true);

      // set focus on the list item
      highlightOption(0);
    }
  };

  const getNextOptionIndex = (currentIndex: number | null, options: Array<SelectOption>) => {
    if (currentIndex === null || currentIndex === options.length - 1) {
      return 0;
    }

    return currentIndex + 1;
  };

  const getPreviousOptionIndex = (currentIndex: number | null, options: Array<SelectOption>) => {
    if (currentIndex === null) {
      return 0;
    }

    if (currentIndex === 0) {
      return options.length - 1;
    }

    return currentIndex - 1;
  };

  const handleOptionKeyDown: KeyboardEventHandler = (event) => {
    if (event.keyCode === KEY_CODES.ESC) {
      setIsOpen(false);

      return;
    }

    if (event.keyCode === KEY_CODES.DOWN_ARROW) {
      highlightOption(getNextOptionIndex(highlightedIndex!, options));
    }

    if (event.keyCode === KEY_CODES.UP_ARROW) {
      highlightOption(getPreviousOptionIndex(highlightedIndex!, options));
    }

    if (event.keyCode === KEY_CODES.ENTER) {
      handleOptionSelected(options[highlightedIndex!], highlightedIndex!);
    }
  };

  return (
    <div className='dse-select'>
      <button
        data-testid='DseSelectButton'
        onKeyDown={handleKeyDown}
        aria-controls='dse-select-list'
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        ref={labelRef}
        className='dse-select__label'
        onClick={handleLabelClick}
      >
        <Text>{selectedOption === null ? label : selectedOption.label}</Text>
        <svg
          className={`dse-select__caret dse-select__caret--${isOpen ? "open" : "close"}`}
          width='1rem'
          height='1rem'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path d='M19 9l-7 7-7-7' />
        </svg>
      </button>
      {isOpen ? (
        <ul role='menu' id='dse-select-list' style={{ top: overlayTop }} className='dse-select__overlay'>
          {options.map((option, index) => {
            const isSelected = selectedIndex === index;
            const isHighlighted = highlightedIndex === index;

            const ref = optionRefs[index];

            const renderOptionProps = {
              option,
              isSelected,
              getOptionRecommendedProps: (overrideProps = {}) => {
                return {
                  key: option.value,
                  ref,
                  tabIndex: isHighlighted ? -1 : 0,
                  role: "menuitemradio",
                  "aria-label": label,
                  "aria-checked": isSelected ? true : undefined,
                  onKeyDown: handleOptionKeyDown,
                  onMouseEnter: () => highlightOption(index),
                  onMouseLeave: () => highlightOption(null),
                  className: `dse-select__option 
                    ${isSelected ? "dse-select__option--selected" : ""}
                    ${isHighlighted ? "dse-select__option--highlighted" : ""}
                  `,
                  onClick: () => handleOptionSelected(option, index),
                  ...overrideProps,
                };
              },
            };

            if (renderOption) {
              return renderOption(renderOptionProps);
            }

            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
                <Text>{option.label}</Text>
                {isSelected && (
                  <svg
                    width='1rem'
                    height='1rem'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path d='M5 13l4 4L19 7' />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Select;
