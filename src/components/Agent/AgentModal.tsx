import './AgentModal.css';
import Modal from '../Modal/Modal';
import { ModalContainerProps } from '../Map/Map';
//import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useAppContext } from '../../context/AppContext';

function AgentModal({ type }: ModalContainerProps) {
  const { t, i18n } = useTranslation();
  const { Province } = useAppContext();
  const lang = i18n.language;
  //const [isloading, setIsloading] = useState<boolean>(false);

  const renderAgent = (name: string, avatar: string, location: string, phone: string) => (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={name} src={`/assets/person/${avatar}`} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {location}
              </Typography>
              {' — ' + phone}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );

  return (
    <Modal small title={t('agent.our_Agents')} rightModal={type === 'Agent'}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {renderAgent('Mr. Binlli', 'binlli.jpg', Province.vientiane[lang as keyof ProvinceData], '02055555555')}
        {renderAgent('Mr. Thone', '2.jpg', Province.luangprabang[lang as keyof ProvinceData], '020555555555')}
        {renderAgent('Somxay', 'somsay.jpg', Province.savannakhet[lang as keyof ProvinceData], '0205555555')}
      </List>
    </Modal>
  );
}

export default AgentModal;
