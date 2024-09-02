import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUser, IUserSpaceData } from '../../../../actions/user';
import setSpaceToken from '../../../../services/setSpaceToken';
import { createSpace } from '../../../../actions/space';
import useUserStore from '../../../../store/user';
import useMenuStore from '../../../../store/menu';
import { SpaceSelectProps } from '../../types';

const SpaceSelect: React.FC<SpaceSelectProps> = ({ drawerOpen, disableGetUser, positionRequired }) => {
  const { menu, updateSelectSpace, updateSpaces } = useMenuStore(x => x);
  const [creatingSpace, setCreatingSpace] = useState<boolean>(false); 
  const { user } = useUserStore(x => x);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
   await getUser();
  };

  const handleSetSpace = (space: IUserSpaceData) => {
    updateSelectSpace(space.id);
    setSpaceToken(space.id);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value as string;
    const selected = menu.spaces.find(space => space.id === selectedId);
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
        updateSpaces([result.space]);
        setCreatingSpace(true); 
      })();
    } else {
      updateSpaces(filteredSpaces);
      
      if (localSpaceId && filteredSpaces.some(space => space.id === localSpaceId)) {
        const space = filteredSpaces.find(space => space.id === localSpaceId);
        if (space) {
          updateSelectSpace(space.id);
          setSpaceToken(space.id);
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
            value={menu.selectedSpace}
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
            {menu.spaces && menu.spaces.map(space => (
              <MenuItem key={space.id} value={space.id}>
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
