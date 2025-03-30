import CustomButton from '../../common/custom-button/custom-button';
import { IErrorPageProps } from './error.types';

const ErrorPage = (props: IErrorPageProps) => {
  const { errorTitle, errorSubtitle, recallAction, recallParams } = props;

  const handleReload = () => {
    if (recallParams) {
      recallAction(recallParams);
    } else {
      recallAction();
    }
  };

  return (
    <div className="error-page">
      <div className="error-page__image">
        <img
          src="/assets/error-icon.png"
          alt="Error icon"
          className="error-page__img"
          data-testid="error-logo"
        />
      </div>
      <div className="error-page__content">
        <h1 className="error-page__title">Error: {errorTitle}</h1>
        <h2 className="error-page__subtitle">{errorSubtitle}</h2>
        {recallAction && (
          <div className="error-page__button-container">
            <h3 className="error-page__button-text">
              Try to reload by pressing this button:
            </h3>
            <CustomButton
              onButtonPressed={handleReload}
              text="RELOAD PAGE"
              disabled={false}
              testId="reload-page-button"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
