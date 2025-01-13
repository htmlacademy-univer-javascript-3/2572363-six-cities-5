import Header from '../../components/header/header.tsx';
import { useAppSelector } from '../../hooks';

export default function LoadingScreen() {
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <Header user={user} />
      <p>Loading ...</p>
    </>
  );
}
