import { AuthorizationStatus } from '../../const.ts';
import { useAppSelector } from '../../hooks';
import { toast } from 'react-toastify';

type PrivateElementProps = {
  children: JSX.Element;
  onClick: () => void;
};

export default function PrivateButton(props: PrivateElementProps) {
  const { children, onClick } = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const handleClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Authorized) {
      toast.error('Необходимо авторизоваться');
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
