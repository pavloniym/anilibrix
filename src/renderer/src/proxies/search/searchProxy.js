// Composables
import {useBaseProxy} from "@proxies/base/baseProxy";
import {useSearchTransformer} from "@transformers/search/searchTransformer";

export function useSearchProxy() {

    // Bindings
    const {fetchSearchedRelease} = useSearchTransformer();
    const {submitRequest, applyEndpoint} = useBaseProxy();

    /**
     * Search releases by name
     *
     * @param searchQuery
     * @return {Promise<{response: *, searchedReleases: array}>}
     */
    const searchReleases = async ({searchInput}) => {

        const response = await submitRequest({
            url: applyEndpoint('/public/api/index.php'),
            data: {query: 'search', search: searchInput},
            method: 'POST',
        });

        return {
            response: response?.data,
            searchedReleases: (response?.data?.data || []).map(searchedRelease => fetchSearchedRelease(searchedRelease))
        };
    }

    return {
        searchReleases
    }
}
