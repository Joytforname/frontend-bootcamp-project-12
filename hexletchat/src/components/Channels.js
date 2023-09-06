import React from 'react';
import {
  Nav,
  Button,
  Dropdown,
  NavItem,
} from 'react-bootstrap';
import leoProfanity from 'leo-profanity';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors, actions as channelsActions } from '../slices/channelsSlice';

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

const ChannelsContainer = ({ handleShow }) => {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const { activeChannelId } = useSelector((state) => state.channels);
  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <span>{t('channels.channels')}</span>
        <Button variant="white" className="p-0 text-primary btn btn-group-vertical" onClick={handleShow('adding')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav fill as="ul" variant="pills" className="flex-column px-2">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isActive={activeChannelId === channel.id}
            handleShow={handleShow}
          />
        ))}
      </Nav>
    </>
  );
};

export default ChannelsContainer;
