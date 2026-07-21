import { MobileProfileView } from '../../../components/mobile/mobile-profile-view';
import { DesktopProfileView } from '../../../components/desktop/desktop-profile-view';

export default function ProfileTab() {
  return (
    <>
      <div className="md:hidden">
        <MobileProfileView />
      </div>
      <div className="hidden md:block">
        <DesktopProfileView />
      </div>
    </>
  );
}
