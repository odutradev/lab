import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { IUserSpaceData } from '../../../../actions/user';
import { createSpace } from '../../../../actions/space';
import useUserStore from '../../../../store/user';
import { SpaceSelectProps } from '../../types';
import setSpaceToken from '../../../../services/setSpaceToken';

const SpaceSelect: React.FC<SpaceSelectProps> = ({ handleSpaceChange }) => {
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const [spaces, setSpaces] = useState<IUserSpaceData[]>([]);
  const { user } = useUserStore(x => x);

  useEffect(() => {
    const filteredSpaces = user?.spaces.filter(space => space.invite === false || space.invite === undefined) || [];
    const localSpaceId = localStorage.getItem('spaceID');
  
    if (filteredSpaces.length === 0) {
      (async () => {
        const result = await createSpace({ name: 'padrão' });
        setSpaces([result as IUserSpaceData]);
        setSelectedSpace((result as IUserSpaceData)._id);
        setSpaceToken((result as IUserSpaceData)._id);
        handleSpaceChange(result as IUserSpaceData);
      })();
    } else {
      setSpaces(filteredSpaces);
      
      if (localSpaceId && filteredSpaces.some(space => space._id === localSpaceId)) {
        const space = filteredSpaces.find(space => space._id === localSpaceId);
        if (space) {
          setSelectedSpace(space._id);
          setSpaceToken(space._id);
          handleSpaceChange(space);
        }
      } else if (filteredSpaces.length > 0) {
        setSelectedSpace(filteredSpaces[0]._id);
        setSpaceToken(filteredSpaces[0]._id);
        handleSpaceChange(filteredSpaces[0]);
      }
    }
  }, [user?.spaces]);
  

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value as string;
    const selected = spaces.find(space => space._id === selectedId);
    if (selected) {
      setSelectedSpace(selectedId);
      handleSpaceChange(selected);
      setSpaceToken(selected._id);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="space-select-label">Tabela</InputLabel>
        <Select
          labelId="space-select-label"
          value={selectedSpace}
          onChange={handleChange}
          label="Tabela"
        >
          {spaces.map(space => (
            <MenuItem key={space._id} value={space._id}>
              {space.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SpaceSelect;
