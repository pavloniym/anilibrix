<template>
  <v-navigation-drawer
    v-if="source.type === 'upscale'"
    v-model="visible"
    absolute
    temporary
    width="350"
    :style="{zIndex: 100}">

    <!-- System Bar Offset-->
    <app-system-bar-placeholder fixed/>

    <!-- Torrent Details -->
    <v-card :class="{'mt-9': !this.isMacOnFullscreen}">
      <v-card-title>Anime4K</v-card-title>
      <v-card-subtitle>Настройки алгоритма интерполяции</v-card-subtitle>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Размытие линий</v-list-item-title>
            <v-slider
              hide-details
              :value="_blur"
              :min="0.0001"
              :max="8"
              :step="0.001"
              @input="setUpscaleParameters({blur: $event})">
            </v-slider>
            <v-list-item-subtitle>
              Данный параметр влияет на четкость изображение и количество артефактов сглаживания. Чем ниже значение, тем
              выше четкость, но больше артефактов и искажений
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>


        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Толщина линий</v-list-item-title>
            <v-slider
              hide-details
              :value="_bold"
              :min="0.0001"
              :max="6"
              :step="0.001"
              @input="setUpscaleParameters({bold: $event})">
            </v-slider>
            <v-list-item-subtitle>
              Данный параметр влияет на четкость изображение и количество артефактов сглаживания. Чем ниже значение, тем
              выше четкость, но больше артефактов и искажений
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider/>
    </v-card>

    <!-- Notice -->
    <div class="caption grey--text px-4 mt-4">
      <div>
        Интерполяция изображения до разрешения 4K выполняется с помощью популярного алгоритма апскейлинга аниме —
        <a href="#" @click.prevent="showGithub">Anime4K</a>
      </div>
      <div>
        Алгоритм работает в реальном времени, и поэтому потребует бОльших мощностей устройства, в сравнении с обычным
        воспроизведением
      </div>
    </div>

  </v-navigation-drawer>
</template>

<script>

  import AppSystemBarPlaceholder from '@components/app/systembar/placeholder'

  import {AppPlatformMixin} from '@mixins/app'
  import {mapState, mapActions} from "vuex";

  const props = {
    source: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    mixins: [AppPlatformMixin],
    components: {
      AppSystemBarPlaceholder
    },
    data() {
      return {
        visible: false,
      }
    },

    computed: {
      ...mapState('app/settings/player', {
        _blur: s => s.upscale.blur,
        _bold: s => s.upscale.bold,
      })
    },

    methods: {
      ...mapActions('app/settings/player', {_setUpscaleParameters: 'setUpscaleParameters'}),

      /**
       * Show torrent data
       *
       * @return void
       */
      show() {
        this.visible = true
      },

      /**
       * Show github
       *
       */
      showGithub() {
        this.$electron.shell.openExternal('https://github.com/bloc97/Anime4K');
      },


      /**
       * Set upscale parameters
       *
       * @param data
       */
      setUpscaleParameters(data) {
        this._setUpscaleParameters({blur: this._blur, bold: this._bold, ...data});
      }
    },

  }
</script>
