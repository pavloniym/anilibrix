import BaseProxy from "@proxies/base/BaseProxy";

export default class SearchProxy extends BaseProxy {

    /**
     * Search releases by name
     *
     * @param searchQuery
     * @return {Promise}
     */
    async searchReleases({searchInput}) {

        const response = await this.submit({
            url: await this.applyEndpoint('/public/api/index.php'),
            data: {query: 'search', search: searchInput},
            method: 'POST',
        });

        return response?.data;

    }

}
