import { useTranslation } from "react-i18next";

const InfoCards = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex gap-2 side-space px-5 mx-auto mb-5 row mobile-hidden">
      <div className="card col"  >
        <div className="card-body">
          <h5 className="card-title">{t('card_role_title')}</h5>
          <p className="card-text">{t('card_role_description')}</p>
        </div>
      </div>
      <div className="card col" >
        <div className="card-body">
          <h5 className="card-title">{t('card_custom_role_title')}</h5>
          <p className="card-text">{t('card_custom_role_description')}</p>
        </div>
      </div>
      <div className="card col" >
        <div className="card-body">
          <h5 className="card-title">{t('card_custom_api_key_title')}</h5>
          <p className="card-text">{t('card_custom_api_key_description')}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoCards;