import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUser, IUserData, IUserSpaceData } from '../../../../actions/user';
import setSpaceToken from '../../../../services/setSpaceToken';
import { createSpace } from '../../../../actions/space';
import useUserStore from '../../../../store/user';
import { SpaceSelectProps } from '../../types';

const SpaceSelect: React.FC<SpaceSelectProps> = ({ handleSpaceChange, drawerOpen, disableGetUser, positionRequired }) => {
  const [creatingSpace, setCreatingSpace] = useState<boolean>(false); 
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const [spaces, setSpaces] = useState<IUserSpaceData[]>([]);
  const { user, setUser } = useUserStore(x => x);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    const response = await getUser();
    setUser(response as IUserData);
  };

  const handleSetSpace = (space: IUserSpaceData) => {
    setSelectedSpace(space._id);
    handleSpaceChange(space);
    setSpaceToken(space._id);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value as string;
    const selected = spaces.find(space => space._id === selectedId);
    if (selected) handleSetSpace(selected);
  };

  useEffect(() => {
    if (!disableGetUser) getCurrentUser();
    if (positionRequired && (user?.role != positionRequired) && (user?.role != 'admin')) navigate('/');
    if (user?.status == 'blocked') navigate('/account-blocked');
    if (user?.status == 'pending') navigate('/account-pending');
  }, []);

  useEffect(() => {
    const filteredSpaces = user?.spaces.filter(space => space.invite === false || space.invite === undefined) || [];
    const localSpaceId = localStorage.getItem('spaceID');
  
    if (filteredSpaces.length === 0) {
      (async () => {
        if (creatingSpace) return;
        const result = await createSpace({ name: 'padrão' });
        if ('error' in result) return;
        handleSetSpace(result.space);
        setSpaces([result.space]);
        setCreatingSpace(true); 
        setUser(result.user);
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
        handleSetSpace(filteredSpaces[0]);
      }
    }
  }, [user?.spaces]);

  return (
    <div style={{ padding: '16px' }}>
      {drawerOpen && (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="space-select-label">Tabela</InputLabel>
          <Select
            labelId="space-select-label"
            value={selectedSpace}
            onChange={handleChange}
            label="Tabela"
            sx={{
              width: 'auto',
              transition: 'width 0.3s ease-in-out',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {spaces.map(space => (
              <MenuItem key={space._id} value={space._id}>
                {space.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default SpaceSelect;
