import {stripHtml} from 'string-strip-html';
import {useSettingsStore} from "@store/settings/settingsStore";

export function useSearchTransformer() {

    // Bindings
    const {applyToConnectionHost} = useSettingsStore();

    /**
     * Fetch search data
     *
     * @param release
     * @return {*}
     */
    const fetchSearchedRelease = (release) => {
        return {
            id: release?.id,
            year: release?.year,
            type: release?.type,
            name: release?.names?.[0] ? stripHtml(release?.names?.[0]).result : null,
            poster: applyToConnectionHost(release?.poster),
            originalName: release?.names?.[0] ? stripHtml(release?.names?.[1]).result : null,
        }
    }

    return {
        fetchSearchedRelease
    }
}
