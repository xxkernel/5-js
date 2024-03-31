import { useCities } from '../../context/CitiesContext';
import Spinner from '../spinner/Spinner';
import Message from '../message/Message';
import CityItem from '../city-item/CityItem';
import styles from './CityList.module.css';

export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem
          city={city}
          key={city.id}
        />
      ))}
    </ul>
  );
}
