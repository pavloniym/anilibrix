<template>
  <options
    v-bind="{attach}"
    is_back
    width="280"
    @back="$emit('back')"
    @close="$emit('close')">

    <template v-for="(key, k) in keys">
      <v-list-item :key="k">
        <v-list-item-content>
          <v-list-item-title v-text="key.title"/>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-subtitle v-text="key.caption" />
        </v-list-item-action>
      </v-list-item>
    </template>

  </options>
</template>

<script>

  // Components
  import Options from './../../_components/options'

  const props = {
    attach: {
      type: Function,
      default: null
    }
  };

  export default {
    props,
    components: {Options},
    computed: {

      /**
       * Keys
       *
       * @return {array}
       */
      keys() {
        return [
          {
            title: 'Пауза / Воспроизведение',
            caption: 'Пробел'
          },
          {
            title: 'Скорость: быстрее',
            caption: 'Shift + >'
          },
          {
            title: 'Скорость: медленнее',
            caption: 'Shift + <'
          },
          {
            title: 'Выключить звук',
            caption: 'M'
          },
          {
            title: 'Полноэкранный режим',
            caption: 'F'
          },
        ]
      }


    }
  }
</script>
