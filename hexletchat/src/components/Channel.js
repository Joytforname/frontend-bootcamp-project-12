import React from 'react';
import {
  Button,
  Dropdown,
  NavItem,
} from 'react-bootstrap';
import leoProfanity from 'leo-profanity';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../slices/channelsSlice';

const Channel = ({ channel, handleShow, isActive }) => {
  const { t } = useTranslation();
  const { id, name, removable } = channel;
  const dispatch = useDispatch();
  const setActive = (currentChannelId) => {
    dispatch(channelsActions.setActiveChannel(currentChannelId));
  };
  const cleanName = leoProfanity.clean(name);
  if (removable) {
    return (
      <NavItem as="li" className="w-100">
        <Dropdown as={Button.Group} className="d-flex">
          <Button
            variant={isActive ? 'secondary' : 'light'}
            onClick={() => setActive(id)}
            className="w-100 rounded-0 text-start text-truncate"
          >
            <span className="me-1">#</span>
            {cleanName}
          </Button>
          <Dropdown.Toggle split variant={isActive ? 'secondary' : 'light'} className="rounded-0">
            <span className="visually-hidden">{t('channels.control')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleShow('removing', channel)}>{t('channels.remove')}</Dropdown.Item>
            <Dropdown.Item onClick={handleShow('renaming', channel)}>{t('channels.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </NavItem>
    );
  }
  return (
    <NavItem as="li" key={id} className="w-100">
      <Button variant={isActive ? 'secondary' : 'light'} onClick={() => setActive(id)} className="w-100 rounded-0 text-start">
        <span className="me-1">#</span>
        {name}
      </Button>
    </NavItem>
  );
};

export default Channel;
