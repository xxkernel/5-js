import Logo from '../logo/Logo';
import AppNav from '../app-nav/AppNav';

import styles from './Sidebar.module.css';
import { Outlet } from 'react-router';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}
