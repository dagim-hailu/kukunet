import { MobileTrackView } from '../../../components/mobile/mobile-track-view';
import { DesktopTrackView } from '../../../components/desktop/desktop-track-view';

export default function TrackTab() {
  return (
    <>
      <div className="md:hidden">
        <MobileTrackView />
      </div>
      <div className="hidden md:block">
        <DesktopTrackView />
      </div>
    </>
  );
}
