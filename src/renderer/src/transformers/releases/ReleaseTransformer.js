import {stripHtml} from 'string-strip-html';

export default class ReleaseTransformer {


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
            episodes: null,
            description: release?.description ? stripHtml(release?.description).result : null,
            originalName: release?.names?.[1] ? stripHtml(release?.names?.[1]).result : null
        }
    }


}
