import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdPersonAdd } from 'react-icons/md';
import { AiRole } from '../../model/app';
import { getSystemContent } from '../../services/systemContextService';
import { setPersistedCustomRole } from '../../store/store';

type Props = {
  role: AiRole | null;
  onRoleChanged: (r: AiRole) => void;
};

const CustomRoleForm = (props: Props) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const { register, handleSubmit, watch } = useForm<AiRole>({ defaultValues: props.role || {} });
  const [previewRole, setPreviewRole] = useState<string>('');
  const { customContext, origin, fullName } = watch();

  const onHandleSubmit = (formValues: AiRole) => {
    const role = { ...formValues, context: 'custom', displayName: formValues.fullName, index: 3 } as AiRole;
    setPersistedCustomRole(role);
    props.onRoleChanged(role);
    setShow(false);
  };

  useEffect(() => {
    if (customContext || origin || fullName) {
      var preview = getSystemContent({
        customContext,
        origin,
        fullName,
        context: 'custom',
        displayName: fullName,
      } as AiRole);
      setPreviewRole(preview);
    }
  }, [customContext, origin, fullName]);

  return (
    <>
      <Button variant="outline-dark" onClick={() => setShow(true)}>
        <MdPersonAdd className="mb-1" />
      </Button>
      <Modal show={show} className="mt-5">
        <Modal.Body>
          <form className="d-grid p-2 gap-2" onSubmit={handleSubmit((data) => onHandleSubmit(data))}>
            <label htmlFor="name_field">{t('name')} *</label>
            <input
              id="name_field"
              className="input-style"
              placeholder={t('placeholder_name') || ''}
              {...register('fullName', { required: true })}
            />
            <label htmlFor="origin_field">{t('origin')} *</label>
            <input
              id="origin_field"
              className="input-style"
              placeholder={t('placeholder_origin') || ''}
              {...register('origin', { required: true })}
            />
            <label htmlFor="context_field">{t('context')}</label>
            <textarea
              id="context_field"
              className="input-style"
              placeholder={t('placeholder_context') || ''}
              {...register('customContext')}
            />
            <div className="d-grid gap-2">
              <Button variant="dark" type="submit">
                {t('add')}
              </Button>
              <Button variant="light" onClick={() => setShow(false)}>
                {t('cancel')}
              </Button>
            </div>
            <label htmlFor="preview_field">{t('preview')}</label>
            <textarea id="preview_field" readOnly={true} style={{ border: '1px solid grey' }} value={previewRole} />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomRoleForm;
