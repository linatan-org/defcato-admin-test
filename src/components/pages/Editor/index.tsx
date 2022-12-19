import React, { useEffect, useRef, useState } from 'react';
import { Button, notification } from 'antd';
// @ts-ignore
import EmailEditor from 'react-email-editor';
import { useTranslation } from 'react-i18next';
import { API } from '../../../server';
import { RESPONSE_STATUSES } from '../../../server/models';
import './styles.scss';

const Editor = () => {
  const { t } = useTranslation();
  const emailEditorRef = useRef(null);
  const [dailyInstruction, setDailyInstruction] = useState('');
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  useEffect(() => {
    API.dailyInstruction.getDailyInstruction().then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK && res.Data) {
        try {
          const parsed = JSON.parse(res.Data);
          setDailyInstruction(parsed);
        } catch (e) {
          notification.success({
            message: 'Error',
            description: 'Data parse error',
            placement: 'bottomRight'
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    if (isEditorLoaded && dailyInstruction) {
      // @ts-ignore
      emailEditorRef && emailEditorRef?.current?.loadDesign(dailyInstruction);
    }
  }, [isEditorLoaded, dailyInstruction]);

  const onSaveDailyInstruction = () => {
    // @ts-ignore
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      API.dailyInstruction.saveDailyInstruction(JSON.stringify(design), JSON.stringify(html)).then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK) {
          notification.success({
            message: '',
            description: t('changesHasBeenSaved'),
            placement: 'bottomRight'
          });
        }
      });
    });
  };

  const onLoad = () => {
    setIsEditorLoaded(true);
  };

  const onReady = () => {
    // dailyInstructionEditor is ready
    console.log('onReady');
  };
  return (
    <div className="wrapper_editor">
      <Button
        className="w-80 m-4"
        type="primary"
        size="large"
        onClick={onSaveDailyInstruction}
      >
        {t('save')}
      </Button>
      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        onReady={onReady}
      />
    </div>
  );
};

export default Editor;
