import { MobileProgressView } from '../../../components/mobile/mobile-progress-view';
import { DesktopProgressView } from '../../../components/desktop/desktop-progress-view';

export default function ProgressTab() {
  return (
    <>
      <div className="md:hidden">
        <MobileProgressView />
      </div>
      <div className="hidden md:block">
        <DesktopProgressView />
      </div>
    </>
  );
}
