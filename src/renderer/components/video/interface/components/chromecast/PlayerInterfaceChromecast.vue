<template>
  <v-navigation-drawer
    v-model="visible"
    right
    absolute
    temporary
    width="350"
    :style="{zIndex: 100}">

    <v-card>
      <v-card-title>Chromecast</v-card-title>
      <v-card-subtitle>Список всех найденных устройств</v-card-subtitle>

      <!-- Loader -->
      <v-skeleton-loader v-if="loading" type="list-item-avatar-two-line@5" elevation="2"/>

      <!-- Devices list -->
      <v-list v-else dense>
        <template v-for="(d, k) in devices">
          <v-divider :key="`d:${k}`"/>
          <v-list-item :key="k" @click="playOnDevice(d)">

            <v-list-item-avatar>
              <v-icon color="grey">mdi-television</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="d.friendlyName"/>
              <v-list-item-subtitle v-text="d.name" class="grey--text text--darken-1"/>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>


    </v-card>

  </v-navigation-drawer>
</template>

<script>

  const props = {
    player: {
      type: Object,
      default: null
    },
    payload: {
      type: [String, Object],
      default: null
    }
  };

  export default {
    props,

    data() {
      return {
        devices: [],
        loading: false,
        visible: false
      }
    },


    methods: {

      /**
       * Show playlist
       *
       * @return void
       */
      show() {
        this.visible = true
      },


      /**
       * Play on device
       *
       * @param device
       */
      playOnDevice(device) {

        // Pause player
        this.player.pause();

        // Send chromecast play event
        this.$electron.ipcRenderer.send('chromecast:play', {
          device,
          src: this.payload,
          options: {
            startTime: this.player.currentTime
          }

        });
      }
    },


    watch: {
      visible: {
        immediate: true,
        handler(visible) {
          if (visible === true) {

            // Set loading state
            this.loading = true;

            // Send event to get devices from chromecast server
            this.$electron.ipcRenderer.send('chromecast:devices:request');

            // Get devices from chromecast server
            this.$electron.ipcRenderer.on('chromecast:devices:items', (e, devices) => {
              this.devices = devices;
              this.loading = false;
            })
          }
        }
      }
    }

  }
</script>
