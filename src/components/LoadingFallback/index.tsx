import { loadingContainer } from './index.css';
import loadingImg from '../../assets/loading.png';

export default function LoadingFallback() {
  return (
    <div className={`${loadingContainer}`}>
      <img className={`${loadingImg}`} src={loadingImg} />
      <h1>Loading...</h1>
    </div>
  );
}
