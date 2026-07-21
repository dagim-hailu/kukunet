import { MobileHomeView } from '../../components/mobile/mobile-home-view';
import { DesktopHomeView } from '../../components/desktop/desktop-home-view';

export default function HomeTab() {
  return (
    <>
      <div className="md:hidden">
        <MobileHomeView />
      </div>
      <div className="hidden md:block">
        <DesktopHomeView />
      </div>
    </>
  );
}
