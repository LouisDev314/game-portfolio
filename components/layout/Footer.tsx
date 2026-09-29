import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-inner">
        <div>
          <p className="footer-kicker">LOUIS CHAN / GAME DESIGNER</p>
          <p className="footer-statement">Curious spaces.<br />Considered play.</p>
        </div>
        <div className="footer-right">
          <a href="mailto:louiscch314@gmail.com" className="footer-email">louiscch314@gmail.com <ArrowUpRight size={16} aria-hidden="true" /></a>
          <Link href="#top" className="footer-top">Back to top ↑</Link>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© {new Date().getFullYear()} Louis Chan</span>
      </div>
    </footer>
  );
}
