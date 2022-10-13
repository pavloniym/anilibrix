import BaseProxy from "@proxies/base/BaseProxy";

export default class ReleasesProxy extends BaseProxy {


    /**
     * Fetch latest releases
     *
     * @return {Promise}
     */
    async fetchLatestReleases() {

        const response = await this.submit({
            url: `${this.getApiEndpoint()}/public/api/index.php`,
            data: {query: 'list', perPage: 14},
            method: 'POST',
        });

        return response?.data;
    }

}
