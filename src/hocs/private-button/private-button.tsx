import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';

type PrivateElementProps = {
  children: JSX.Element;
  onClick: () => void;
};

export default function PrivateButton(props: PrivateElementProps) {
  const { children, onClick } = props;
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const handleClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Authorized) {
      navigate(AppRoute.Login);
    } else {
      onClick();
    }
  };

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
}
