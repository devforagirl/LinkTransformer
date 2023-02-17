<template>
  <div class="ProcessStatusCompBigBox">
    <div class="inputStatusBox">
      <div :class="classATOB">
        Decoded
      </div>
      <div :class="classJSON">
        JSON.parse
      </div>
      <div :class="classBTOA">
        Encoded
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['flag_ATOB', 'flag_BTOA', 'flag_JSON']),

    classATOB() {
      return {
        classIdling: this.flag_ATOB === 0,
        classSuccess: this.flag_ATOB === 1,
        classFailed: this.flag_ATOB === 2
      }
    },
    classBTOA() {
      return {
        classIdling: this.flag_BTOA === 0,
        classSuccess: this.flag_BTOA === 1,
        classFailed: this.flag_BTOA === 2
      }
    },
    classJSON() {
      return {
        classIdling: this.flag_JSON === 0,
        classSuccess: this.flag_JSON === 1,
        classFailed: this.flag_JSON === 2
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style>
.ProcessStatusCompBigBox {
  border: 1px solid rgba(255, 255, 255);
}

.classSuccess {
  background-color: rgb(0, 255, 0, 0.6);
}

.classFailed {
  background-color: rgb(255, 0, 0, 0.6);
}

.classIdling {
  background-color: rgba(8, 8, 8, 0.5);
  color: darkgray;
}
</style>
