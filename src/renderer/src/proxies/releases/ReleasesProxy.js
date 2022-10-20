import BaseProxy from "@proxies/base/BaseProxy";

export default class ReleasesProxy extends BaseProxy {


    /**
     * Fetch latest releases
     *
     * @return {Promise}
     */
    async fetchLatestReleases() {

        const response = await this.submit({
            url: await this.applyEndpoint('/public/api/index.php'),
            data: {query: 'list', perPage: 14},
            method: 'POST',
        });

        return response?.data;
    }


    /**
     * Fetch release by id
     *
     * @param releaseId
     * @return {Promise<*>}
     */
    async fetchReleaseById({releaseId}) {

        const response = await this.submit({
            url: await this.applyEndpoint('/public/api/index.php'),
            data: {id: releaseId, query: 'release'},
            method: 'POST',
        });

        return response?.data;

    }

}
