<template>
  <div ref="settings">
    <v-card>
      <v-list dense>
        <template v-for="(item, k) in settings">
          <v-list-item :key="k" @click="item.action">
            <v-list-item-content>
              <v-list-item-title v-text="item.title"/>
            </v-list-item-content>
            <v-list-item-action class="text-right">
              <v-list-item-subtitle v-text="item.value"/>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card>


    <!-- Dialogs -->
    <template v-if="isMounted">
      <component
        v-for="(dialog,k) in dialogs"
        :is="dialog.component"
        :key="k"
        :ref="dialog.ref"
        :attach="$refs.settings">
      </component>
    </template>

  </div>
</template>

<script>

  import ExitDialog from './dialogs/exit'
  import CacheDialog from './dialogs/cache'

  export default {
    data() {
      return {
        isMounted: false,
      }
    },

    computed: {

      /**
       * Get settings items
       *
       * @return array
       */
      settings() {
        return [
          {
            title: 'Сбросить кеш приложения',
            action: () => this.$refs.cache[0].showDialog(),
          },
          {
            title: 'Закрыть приложение',
            action: () => this.$refs.exit[0].showDialog(),
          }
        ]
      },


      /**
       * Get dialogs
       *
       * @return Array
       */
      dialogs() {
        return [
          {component: ExitDialog, ref: 'exit'},
          {component: CacheDialog, ref: 'cache'}
        ]
      }
    },

    mounted() {
      this.isMounted = true;
    }

  }
</script>
