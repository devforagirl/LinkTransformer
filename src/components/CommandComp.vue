<template>
  <div class="commandCompBigBox">
    <div class="optionBox">
      <v-radio-group
        v-model="radioValue"
        mandatory
        class="optionsGroupBox"
      >
        <v-radio
          label="IP2L(Between 2 IPs)"
          color="white"
          value="1"
        />
        <v-radio
          label="IP2L(Single IPs)"
          color="white"
          value="2"
        />
        <v-radio
          label="IP2L(IPs Range)"
          color="white"
          value="7"
        />
        <v-radio
          label="L2IP"
          color="white"
          value="3"
        />
        <!-- <v-radio
          label="L2L"
          color="white"
          value="4"
        /> -->
        <v-radio
          label="Compare"
          color="white"
          value="5"
        />
        <v-radio
          label="Modify-批量修改连接的属性"
          color="white"
          value="6"
        />
      </v-radio-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      // name: 'bruce lee'
    }
  },
  computed: {
    ...mapState(['objInputFirstLink', 'strOutputToCopy']),

    radioValue: {
      get() {
        console.log('get()2->', this.$store.state.radioValue)
        return this.$store.state.radioValue
      },

      set(newVal) {
        console.log('set()2-newVal->', newVal)
        this.$store.commit('radioValue', newVal)
        this.$router.push(`/dashboard/option${newVal}`)
      }
    }
  },
  created() { },
  methods: {}
}
</script>

<style scoped>
.commandCompBigBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

/* .optionBox {
} */

.btnBox {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}
</style>
