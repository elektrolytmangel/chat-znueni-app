import { useTranslation } from 'react-i18next';
import './LegalInformation.css';

const LegalInformation = () => {
  const { t } = useTranslation();
  const version = process.env.REACT_APP_VERSION || '0.0.0';

  return (
    <div>
      <p className="text-sm">
        {t('legal_information')} v{version}
      </p>
    </div>
  );
};

export default LegalInformation;
