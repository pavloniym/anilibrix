import {useBaseProxy} from "@proxies/base/baseProxy";
import {useAccountStore} from "@store/account/accountStore";
import {useReleasesTransformer} from "@transformers/releases/releasesTransformer";

export function useFavoritesProxy() {

    // Bindings
    const {isAuthorized} = useAccountStore()
    const {fetchRelease} = useReleasesTransformer();
    const {submitRequest, applyEndpoint} = useBaseProxy();

    /**
     * Fetch favorites
     *
     * @return {Promise}
     */
    const fetchFavorites = async () => {
        if (isAuthorized === true) {

            const response = await submitRequest({
                url: applyEndpoint('/public/api/index.php'),
                data: {page: 1, perPage: 15, query: 'favorites'},
                method: 'POST',
            });

            return (response?.data?.data?.items || []).map(release => fetchRelease(release))

        }

        return [];
    }


    return {
        fetchFavorites
    }

}
