import { useEffect, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaLock } from 'react-icons/fa';
import { getApiKey, setApiKey } from "../../api/openaiapi";

const ApiKeyInput = () => {
  const { t } = useTranslation();
  const [key, setKey] = useState('');
  const [show, setShow] = useState(false);

  const submitApiKey = (key: string) => {
    setApiKey(key);
    setShow(false);
  }

  useEffect(() => {
    setKey(getApiKey() || '');
  }, [show]);

  return (
    <>
      <Button variant={key === '' ? 'light' : 'success'} onClick={() => setShow(true)}><FaLock className='mb-1' /></Button>
      <Modal show={show}>
        <Modal.Body >
          <div className='d-grid p-2 gap-2'>
            <input className='row' placeholder={t('placeholder_api_key') || ''} onChange={e => setKey(e.target.value)} value={key} />
            <div className='row gap-2'>
              <Button
                className='col'
                variant="light"
                onClick={() => setShow(false)}>
                {t('cancel')}
              </Button>
              <Button
                className='col'
                variant="dark"
                onClick={() => submitApiKey(key)}>
                {t('ok')}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ApiKeyInput;