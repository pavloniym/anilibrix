<template>
  <v-slide-y-reverse-transition appear>
    <div v-if="is_visible" class="downloads">
      <v-layout fill-height align-center justify-center>

        <v-slide-group show-arrows :style="{width: 'calc(100% - 40px)'}">
          <v-divider vertical/>
          <v-slide-item v-for="file in files" v-slot:default>
            <v-layout :key="file.id" :style="{maxWidth: '300px', width: '300px'}">
              <download-file v-bind="{file}"/>
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

  // Components
  import DownloadFile from './components/file'

  // Handlers
  import {handleDownloadProgress, handleDownloadStarted} from "@main/handlers/download/downloadHandlers";


  export default {
    components: {
      DownloadFile
    },
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
        // cancelDownload(id);
        this.files.splice(this.files.findIndex(file => file.id === id), 1);

        // If now files left -> close bar
        if (this.files.length === 0) {
          // this.closeDownloadedBar();
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
          // openDownload(id);
        }
      }

    },


    created() {
      // Handle download started
      handleDownloadStarted(({id, release, episode, source}) => {

        // Show download bar
        this.is_visible = true;

        // Check if file is not already added
        // If not exists -> add to file storage
        const file = this.files.find(item => item.id === id);
        if (!file) this.files.push({id, release, episode, source, progress: 0});

      });


      // Handle download progress
      // Set file progress
      handleDownloadProgress(({id, percent}) => {
        const file = this.files.find(item => item.id === id);
        if (file) file.progress = percent * 100;
      });
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
