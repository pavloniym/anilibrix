import {stripHtml} from 'string-strip-html';

export default class SearchTransformer {

    /**
     * Fetch search data
     *
     * @param release
     * @return {*}
     */
    fetchRelease(release) {
        return {
            id: release?.id,
            year: release?.year,
            type: release?.type,
            name: release?.names?.[0] ? stripHtml(release?.names?.[0]).result : null,
            poster: release?.poster,
            originalName: release?.names?.[0] ? stripHtml(release?.names?.[1]).result : null,
        }
    }
}
