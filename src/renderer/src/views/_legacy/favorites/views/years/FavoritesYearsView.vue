<template>
    <div>
        <year
            v-for="(item, k) in years"
            v-bind="item"
            class="mb-2"
            :key="k"
            @toRelease="$emit('toRelease', $event)">
        </year>
    </div>
</template>

<script>

    import Year from './components/year'

    const props = {
        releases: {
            type: Array,
            default: null
        }
    };

    export default {
        props,
        components: {
            Year
        },
        computed: {

            /**
             * Get years groups
             *
             * @return {array}
             */
            years() {
                const years = {};

                (this.releases || []).forEach(release => {
                    const year = release.year;
                    years[year] = {...years[year]};
                    years[year].year = year;
                    years[year].releases = [...(years[year].releases || []), ...[release]]
                });

                console.log({years});
                console.log(Object.values(years).map(r => (r.releases || []).length).reduce((s, a) => s + a, 0));

                return Object
                    .values(years)
                    .sort((a, b) => b.year - a.year);
            }

        }


    }
</script>
