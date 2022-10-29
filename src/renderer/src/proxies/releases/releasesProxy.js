// Composables
import {useBaseProxy} from "@proxies/base/baseProxy";
import {useReleasesTransformer} from "@transformers/releases/releasesTransformer";

export function useReleasesProxy() {

    // Bindings
    const {fetchRelease} = useReleasesTransformer();
    const {submitRequest, applyEndpoint} = useBaseProxy();


    /**
     * Fetch latest releases
     *
     * @return {Promise<{response: *, latestReleases: array}>}
     */
    const fetchLatestReleases = async () => {

        const response = await submitRequest({
            url: applyEndpoint('/public/api/index.php'),
            data: {query: 'list', perPage: 14},
            method: 'POST',
        });

        return {
            response: response?.data,
            latestReleases: (response?.data?.data?.items || []).map(release => fetchRelease(release))
        };
    }


    /**
     * Fetch release by id
     *
     * @param releaseId
     * @return {Promise<{response: *, release: *}>}
     */
    const fetchReleaseById = async ({releaseId}) => {

        const response = await submitRequest({
            url: applyEndpoint('/public/api/index.php'),
            data: {id: releaseId, query: 'release'},
            method: 'POST',
        });

        return {
            release: response?.data?.data ? fetchRelease(response?.data?.data) : null,
            response: response?.data,
        };

    }

    return {
        fetchReleaseById,
        fetchLatestReleases
    }

}
