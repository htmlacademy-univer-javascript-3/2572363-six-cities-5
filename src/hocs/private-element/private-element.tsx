import { AuthorizationStatus } from '../../const.ts';
import { useAppSelector } from '../../hooks';

type PrivateElementProps = {
  children: JSX.Element;
};

export default function PrivateElement(props: PrivateElementProps) {
  const { children } = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return authorizationStatus === AuthorizationStatus.Authorized ? (
    children
  ) : null;
}
