import firebase from "@plugins/firebase";

export default class {

  /**
   * Get episodes watch data
   * For provided user
   *
   * @param userId
   * @return Array
   */
  static async getWatchData({userId = null} = {}) {
    if (userId !== null) {

      const collection = await firebase
        .collection(`watch`)
        .where('userId', '==', userId)
        .get();

      return collection.docs.map(doc => {
        return {
          _id: doc.id,
          ...doc.data()
        }

      });
    }
  }


  /**
   * Save episode's watch data
   * For provided user and release
   *
   * @param userId
   * @param releaseId
   * @param episodeId
   * @param time
   * @return Promise
   */
  static async setWatchData({userId = null, releaseId = null, episodeId = -1, data = null} = {}) {
    if (userId !== null && releaseId !== null && episodeId > -1) {
      return await firebase
        .collection('watch')
        .doc(`${userId}:${releaseId}:${episodeId}`)
        .set({...data, userId, releaseId, episodeId}, {merge: true})
    }
  }


  /**
   * Remove watch data
   *
   * @param userId
   * @param releaseId
   * @param episodeId
   * @return Promise
   */
  static async removeWatchData({userId = null, releaseId = null, episodeId = -1} = {}) {
    if (userId !== null && releaseId !== null && episodeId > -1) {
      return await firebase
        .collection('watch')
        .doc(`${userId}:${releaseId}:${episodeId}`)
        .delete()
    }
  }

}
