import {useBaseProxy} from "@proxies/base/baseProxy";
import {useReleasesTransformer} from "@transformers/releases/releasesTransformer";

export function useReleasesProxy() {

    // Bindings
    const {fetchRelease} = useReleasesTransformer();
    const {submitRequest, applyEndpoint} = useBaseProxy();


    /**
     * Fetch release by id
     *
     * @param releaseId
     * @return {Promise}
     */
    const fetchReleaseById = async ({releaseId}) => {

        const response = await submitRequest({
            url: applyEndpoint('/public/api/index.php'),
            data: {id: releaseId, query: 'release'},
            method: 'POST',
        });

        return response?.data?.data ? fetchRelease(response?.data?.data) : null;

    }


    /**
     * Fetch latest releases
     *
     * @return {Promise}
     */
    const fetchLatestReleases = async () => {

        const response = await submitRequest({
            url: applyEndpoint('/public/api/index.php'),
            data: {query: 'list', perPage: 14},
            method: 'POST',
        });

        return (response?.data?.data?.items || []).map(release => fetchRelease(release));
    }

    return {
        fetchReleaseById,
        fetchLatestReleases
    }

}
