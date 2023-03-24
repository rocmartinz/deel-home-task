import React, { useState } from 'react';

import AutocompleteInput from './shared/components/AutocompleteInput/AutocompleteInput';
import { searchUsersByName } from './shared/services/UserService/UserService';

import './App.scss';

export default function App() {
  const [userOne, setUserOne] = useState<string | undefined>();
  const [userTwo, setUserTwo] = useState<string | undefined>();

  const onSearch = async (value: string): Promise<string[]> => {
    return searchUsersByName(value);
  };

  return (
    <div className="deel-home-task">
      <div>
        <h1>Search User by Name (NOT requiring selection)</h1>
        <AutocompleteInput onChange={setUserOne} onSearch={onSearch} />
        <p>User #1: {userOne}</p>
      </div>

      <div>
        <h1>Search User by Name (requiring selection)</h1>
        <AutocompleteInput onChange={setUserTwo} onSearch={onSearch} requireUserSelection />
        <p>User #2: {userTwo}</p>
      </div>
    </div>
  );
}
