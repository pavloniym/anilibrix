import {stripHtml} from 'string-strip-html';

export default class ReleasesTransformer {


    /**
     * Fetch release
     *
     * @param release
     * @returns {*}
     */
    static fetchRelease(release) {
        return {
            id: release?.id,
            year: release?.year,
            type: release?.type,
            code: release?.code,
            name: release?.names?.[0] ? stripHtml(release?.names?.[0]).result : null,
            voices: release?.voices || [],
            genres: release?.genres || [],
            poster: release?.poster,
            datetime: release?.last ? new Date(release?.last * 1000) : null,
            episodes: (release?.playlist || []).map(episode => {
                return {
                    id: episode?.uuid,
                    q480: episode?.sd,
                    q720: episode?.hd,
                    q1080: episode?.fullhd,
                    title: episode?.title,
                    poster: episode?.poster || null,
                    ordinal: episode?.ordinal,
                    updatedAt: episode?.updated_at ? new Date(episode?.updated_at * 1000) : null,
                    openingSkipTo: episode?.skips?.opening?.[1] || null,
                    openingSkipFrom: episode?.skips?.opening?.[0] || null,
                    posterThumbnail: episode?.poster_thumbnail || null,
                }
            }),
            description: release?.description ? stripHtml(release?.description).result : null,
            originalName: release?.names?.[1] ? stripHtml(release?.names?.[1]).result : null
        }
    }


}
