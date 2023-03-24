import React, { ChangeEvent, useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick/useOutsideClick";

import Spinner from "../Spinner/Spinner";

import './AutocompleteInput.scss';
import AutocompleteInputOptions from "./AutocompleteInputOptions";

export interface IAutocompleteInputProps {
  ariaLabel?: string;
  disabled?: boolean;
  requireUserSelection?: boolean;
  label?: string;
  minCharForSearch?: number;
  onChange: (value: string | undefined) => void;
  onSearch: (value: string) => Promise<string[]>;
  placeholder?: string;
  value?: string;
}

export default function AutocompleteInput({
  ariaLabel,
  disabled,
  requireUserSelection,
  label,
  minCharForSearch = 3,
  onChange,
  onSearch,
  placeholder,
  value = ''
}: IAutocompleteInputProps): JSX.Element {
  const autocompleteInputRef = useRef<HTMLDivElement>(null);

  const [options, setOptions] = useState<string[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  useOutsideClick(autocompleteInputRef, () => {
    setOptions([]);
  });

  const handleChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const updatedValue = event.target.value;

    setInternalValue(updatedValue);

    if (!requireUserSelection || !updatedValue) {
      onChange(updatedValue);
    }

    if (!updatedValue || updatedValue.length < minCharForSearch) {
      setOptions([]);
      return;
    }

    if (requireUserSelection) {
      onChange('');
    }

    setIsLoadingOptions(true);
    const _options = await onSearch(updatedValue);
    setOptions(_options);
    setIsLoadingOptions(false);
  }

  const onOptionClick = (option: string) => {
    setInternalValue(option);
    onChange(option);
    setOptions([]);
  };

  return (
    <div className="autocomplete-input" ref={autocompleteInputRef}>
      <label className="label">
        {label}
      </label>

      <div className="input-container">
        <input
          aria-label={ariaLabel}
          className="input"
          disabled={disabled}
          onChange={handleChange}
          placeholder={placeholder}
          type="text"
          value={internalValue}
        />

        {isLoadingOptions && <Spinner size={28} />}
      </div>

      {Boolean(options.length) && internalValue && (
        <AutocompleteInputOptions
          onOptionClick={onOptionClick}
          options={options}
          search={internalValue}
        />
      )}
    </div>
  )
}