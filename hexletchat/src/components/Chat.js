/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  Form,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import { selectors as messagesSelectors } from '../slices/messagesSlice';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import useApi from '../hooks/useApi';

const Chat = ({ user }) => {
  const { t } = useTranslation();
  const api = useApi();
  const messages = useSelector(messagesSelectors.selectAll);
  const channels = useSelector(channelsSelectors.selectAll);
  const channelId = useSelector((state) => state.channels.activeChannelId);
  const currentChannel = channels.find((channel) => channel.id === channelId);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      try {
        const message = {
          body: leoProfanity.clean(values.body),
          username: user,
          channelId,
        };
        await api.sendNewMessage(message);
        formik.resetForm();
      } catch (err) {
        toast.error(t('errors.connect'));
      }
    },
    validationSchema: yup.object({
      body: yup.string().required(t('validation.required')),
    }),
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
    inputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [channelId]);

  const getTotalMessages = (id) => messages.filter((message) => message.channelId === id).length;

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0"><b>{`# ${leoProfanity.clean(currentChannel?.name)}`}</b></p>
        <span className="text-muted">{t('messages.messageWithCount', { count: getTotalMessages(channelId) })}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {messages
          .filter((message) => message.channelId === channelId)
          .map((message) => {
            if (messages.length === 0) {
              return null;
            }
            const { body, username, id } = message;
            return (
              <div key={id} className="text-break mb-2">
                <b>{username}</b>
                {`: ${body}`}
              </div>
            );
          })}
        <span ref={messagesEndRef} />
      </div>
      <div className="mt-auto px-5 py-3">
        <Form onSubmit={formik.handleSubmit} disabled={formik.isSubmitting} className="py-1 border rounded-2">
          <InputGroup>
            <Form.Control
              id="body"
              name="body"
              type="text"
              placeholder="Введите сообщение..."
              aria-label="Новое сообщение"
              className="border-0 p-0 ps-2"
              onChange={formik.handleChange}
              value={formik.values.body}
              disabled={formik.isSubmitting}
              ref={inputRef}
              required
            />
            <Button
              type="submit"
              className="btn btn-group-vertical"
              variant="outline-primary"
              id="button-text"
              disabled={formik.values.body === '' || formik.isSubmitting}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
              <span className="visually-hidden">Отправить</span>
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
