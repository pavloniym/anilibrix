<template>
  <div>
    <component :is="view" v-bind="{releases}"/>
  </div>
</template>

<script>

  // Views
  import Flow from "./_views/flow";
  import Years from "./_views/years";

  // Store
  import {mapGetters, mapState} from "vuex";
  import {GET_RELEASE_PROGRESS_GETTER} from "@store/app/watch/appWatchStore";

  const props = {
    items: {
      type: Array,
      default: null
    }
  };

  export default {
    props,
    computed: {
      ...mapState('favorites', {
        _sort: s => s.settings.sort,
        _group: s => s.settings.group,
        _show_seen: s => s.settings.show_seen
      }),
      ...mapGetters('app/watch', [GET_RELEASE_PROGRESS_GETTER]),


      /**
       * Get active view
       *
       * @return {*}
       */
      view() {
        if (this._group === 'years') return Years;
        if (this._group === 'original') return Flow;
      },


      /**
       * Get releases
       * Sort with provided type
       * Check seen releases
       * Check search
       *
       * @return {array}
       */
      releases() {

        // Create releases copy from store
        let releases = [...(this.items || [])];

        // Check sort type
        // Sort by title if sort type is 'title'
        // Sort by release update datetime if sort type is 'updates'
        if (this._sort === 'title') releases = releases.sort((a, b) => a.names.ru.localeCompare(b.names.ru));
        if (this._sort === 'updates') releases = releases.sort((a, b) => b.datetime && a.datetime ? b.datetime.system - a.datetime.system : 0);

        // Check if should show seen release
        // Check progress and show seen state
        releases = releases.filter(release => {

          const release_id = release.id;
          const total_episodes_number = (this.$__get(release, 'episodes') || []).length;

          // Get release progress
          const payload = {release_id, total_episodes_number};
          const progress = this[GET_RELEASE_PROGRESS_GETTER](payload);

          return progress < 100 || (progress === 100 && this._show_seen === true);
        });

        return releases;
      },


    }
  }
</script>
