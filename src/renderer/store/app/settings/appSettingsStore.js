import player from './player/settingsPlayerStore'
import system from './system/settingsSystemStore'

export default {
  namespaced: true,
  modules: {
    player,
    system
  }
}
