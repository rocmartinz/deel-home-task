import React, { useMemo } from 'react';

import './AutocompleteInputOptions.scss';

export interface IAutocompleteInputOptionsProps {
  onOptionClick: (option: string) => void;
  options: string[];
  search: string;
}

interface IAutocompleteInputOption {
  html: string;
  value: string;
}

export default function AutocompleteInputOptions({ onOptionClick, options, search }: IAutocompleteInputOptionsProps): JSX.Element | null {
  const _onOptionClick = (option: string) => () => {
    onOptionClick(option);
  }

  const _options = useMemo<IAutocompleteInputOption[]>(() => {
    const matchRegex = new RegExp(search, 'ig');
    return options.map(option => {
      const html = option.replace(matchRegex, match => {
        return `<strong>${match}</strong>`;
      });
      return { html, value: option } as IAutocompleteInputOption;
    });
  }, [options, search]);

  if (!options.length) {
    return null;
  }

  return (
    <ul className="autocomplete-input-options">
      {_options.map((option, index) => {
        return (
          <li key={index} className="option" onClick={_onOptionClick(option.value)}>
            <span dangerouslySetInnerHTML={{ __html: option.html }}></span>
          </li>
        )
      })}
    </ul>
  )
}