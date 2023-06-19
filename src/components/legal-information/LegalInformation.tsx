import { useTranslation } from 'react-i18next';
import './LegalInformation.css';

const LegalInformation = () => {
  const { t } = useTranslation();
  return (
    <div>
      <p className="text-sm">{t('legal_information')}</p>
    </div>
  )
}

export default LegalInformation;