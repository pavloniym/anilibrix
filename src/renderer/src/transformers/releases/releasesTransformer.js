import {stripHtml} from 'string-strip-html';
import {useSettingsStore} from "@store/settings/settingsStore";

export function useReleasesTransformer() {

    // Bindings
    const {applyToConnectionHost} = useSettingsStore();

    /**
     * Fetch release
     *
     * @param release
     * @returns {*}
     */
    const fetchRelease = (release) => {
        return {
            id: release?.id,
            year: release?.year,
            type: release?.type,
            code: release?.code,
            name: release?.names?.[0] ? stripHtml(release?.names?.[0]).result : null,
            voices: release?.voices || [],
            genres: release?.genres || [],
            poster: applyToConnectionHost(release?.poster),
            datetime: release?.last ? new Date(release?.last * 1000) : null,
            episodes: (release?.playlist || []).map(episode => {
                return {
                    id: episode?.uuid,
                    q480: episode?.sd,
                    q720: episode?.hd,
                    q1080: episode?.fullhd,
                    name: episode?.name,
                    title: episode?.title,
                    poster: applyToConnectionHost(episode?.poster || null),
                    ordinal: episode?.ordinal,
                    updatedAt: episode?.updated_at ? new Date(episode?.updated_at * 1000) : null,
                    openingSkipTo: episode?.skips?.opening?.[1] || null,
                    openingSkipFrom: episode?.skips?.opening?.[0] || null,
                    posterThumbnail: applyToConnectionHost(episode?.poster_thumbnail || null),
                }
            }),
            description: release?.description ? stripHtml(release?.description).result : null,
            originalName: release?.names?.[1] ? stripHtml(release?.names?.[1]).result : null
        }
    }


    return {
        fetchRelease
    }
}
