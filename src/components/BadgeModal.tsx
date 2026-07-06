import * as Dialog from '@radix-ui/react-dialog';
import { useSeasonBadge } from '../hooks/useSeasonBadge';
import { useTranslation } from '../hooks/useTranslation';
import { Spinner } from './shared/Spinner';
import type { League } from '../types/league';

type Props = {
  league: League | null;
  onClose: () => void;
};

export function BadgeModal({ league, onClose }: Props) {
  const { t } = useTranslation();
  const { data: seasons = [], isLoading } = useSeasonBadge(
    league?.idLeague ?? null,
  );

  const firstWithBadge = seasons.find((s) => s.strBadge);

  return (
    <Dialog.Root open={!!league} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-overlay-show fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="animate-content-show fixed left-1/2 top-1/2 bg-white rounded-2xl shadow-xl p-8 w-[calc(100%-2rem)] max-w-sm flex flex-col items-center gap-6 outline-none">
          <div className="w-full flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-bold text-gray-900 leading-snug">
                {league?.strLeague}
              </Dialog.Title>
              {league?.strLeagueAlternate && (
                <p className="text-sm text-gray-400 mt-0.5">
                  {league.strLeagueAlternate}
                </p>
              )}
            </div>
            <Dialog.Close
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer text-xl leading-none mt-0.5 focus:outline-none"
            >
              ✕
            </Dialog.Close>
          </div>

          <div className="w-full flex flex-col items-center gap-2 min-h-32 justify-center">
            {isLoading && <Spinner size={32} className="text-red-400" />}

            {!isLoading && firstWithBadge && (
              <>
                <img
                  src={firstWithBadge.strBadge}
                  alt={league?.strLeague}
                  className="animate-fade-in-scale w-48 h-48 object-contain"
                />
                <p className="text-xs text-gray-400">
                  {t('modal.season')} {firstWithBadge.strSeason}
                </p>
              </>
            )}

            {!isLoading && !firstWithBadge && (
              <p className="text-sm text-gray-400">{t('modal.noBadge')}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2.5 rounded-lg cursor-pointer transition-colors"
          >
            {t('modal.close')}
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
