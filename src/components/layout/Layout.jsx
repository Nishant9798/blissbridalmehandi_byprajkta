import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import PageTransition from './PageTransition';
import ScrollProgressBar from '../ui/ScrollProgressBar';
import BackToTopButton from '../ui/BackToTopButton';

export default function Layout() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <ScrollProgressBar />}
      {!isAdmin && <Navbar />}
      <main className={isAdmin ? '' : 'min-h-screen'}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <BackToTopButton />}
    </>
  );
}
