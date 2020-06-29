<template>
  <v-slide-y-reverse-transition appear>
    <div v-if="is_visible" class="downloads">
      <v-layout fill-height align-center justify-center>

        <v-slide-group show-arrows :style="{width: 'calc(100% - 40px)'}">
          <v-divider vertical/>
          <v-slide-item v-for="file in files" :key="n" v-slot:default>
            <v-layout :key="file.id" :style="{maxWidth: '240px'}">
              <v-list-item @click="openFile(file)">

                <!-- Avatar -->
                <v-progress-circular
                  size="46"
                  class="mr-4"
                  :value="file.progress && file.progress.percent ? file.progress.percent * 100 : 0">
                  <v-layout justify-center align-center>
                    <v-list-item-avatar size="40" class="ma-0">
                      <v-img :src="file.release.poster.image"/>
                    </v-list-item-avatar>
                  </v-layout>
                </v-progress-circular>


                <!-- Content -->
                <!-- Title -->
                <!-- Episode -->
                <v-list-item-content>
                  <v-list-item-title
                    v-text="file.release.names.ru"
                    class="caption font-weight-bold"
                    :style="{lineHeight: 1}">
                  </v-list-item-title>
                  <v-list-item-subtitle
                    v-text="`Эпизод: ${file.episode.id} • ${file.source.label}p`"
                    class="caption"
                    :style="{lineHeight: 1}">
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon small color="grey" @click="cancelFileDownload(file)">
                    <v-icon small>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>

              </v-list-item>
              <v-divider vertical/>
            </v-layout>
          </v-slide-item>
        </v-slide-group>

        <v-spacer/>

        <!-- Close -->
        <v-btn icon class="mr-6" color="grey" @click="closeDownloadedBar">
          <v-icon>mdi-close</v-icon>
        </v-btn>

      </v-layout>
    </div>
  </v-slide-y-reverse-transition>
</template>

<script>

  import {
    openDownload,
    cancelDownload,
    startedDownload,
    progressDownload,
  } from "@main/handlers/download/downloadHandlers";

  export default {
    data() {
      return {
        files: [],
        is_visible: false,
      }
    },

    methods: {

      /**
       * Close downloaded bar
       *
       * @return {void}
       */
      closeDownloadedBar() {
        this.is_visible = false;
        this.files = [];
      },


      /**
       * Cancel file download
       *
       * @param id
       */
      cancelFileDownload({id}) {

        // Send cancel event
        // Remove from store
        cancelDownload(id);
        this.files.splice(this.files.findIndex(file => file.id === id), 1);

        // If now files left -> close bar
        if (this.files.length === 0) {
          this.closeDownloadedBar();
        }

      },


      /**
       * Open file
       *
       * @param id
       * @param progress
       */
      openFile({id, progress}) {
        if (progress.percent >= 1) {
          openDownload(id);
        }
      }

    },


    created() {

      // Started download
      // Get new downloaded item
      startedDownload(({id, release, episode, source, progress}) => {
        this.is_visible = true;
        this.files.push({id, release, episode, source, progress});
      });

      // Get file progress
      // Set current progress for related file
      progressDownload(({id, progress}) => {
        const file = this.files.find(file => file.id === id);
        if (file) {
          file.progress = progress;
        }
      })
    }

  }
</script>

<style scoped lang="scss">

  .downloads {
    width: 100%;
    height: 60px;
    background: #353535;
    position: absolute;
    bottom: 0;
    padding: 0 5%;
  }
</style>
