<template>
  <div
    class="VscrollItemBigBox"
    @click="itemClick"
  >
    <span>{{ myString }} </span>
    <span class="textLink">{{ source.value }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Item',
  props: {
    source: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['resultNumber']),

    myString() {
      const num = this.resultNumber - this.source.sid
      const string = '[' + num + ']-'
      return string
    }
  },
  mounted() {
  },
  methods: {
    itemClick() {
      console.log('itemClick()+1')
    }
  }
}
</script>

<style scoped>
.VscrollItemBigBox {
  display: flex;
  flex-direction: row;
  margin: 0 0 10px 0;
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
