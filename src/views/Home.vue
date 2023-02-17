<template>
  <div class="HomeBigBox">
    <div class="InnerHomeBigBox">
      <div class="topBox">
        <div class="inputOutterBox">
          <div class="inputBox">
            <v-text-field
              v-model="textInput"
              label="Vmess Link"
              placeholder="vmess link"
              outlined
              clearable
            />
          </div>
          <ProcessStatusComp />
        </div>
        <v-btn @click="btnSet">
          {{ btnText }}
        </v-btn>
      </div>
      <div class="bottomBox">
        <LinkDetailComp />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LinkDetailComp from '../components/LinkDetailComp.vue'
import ProcessStatusComp from '../components/ProcessStatusComp.vue'

export default {
  components: { LinkDetailComp, ProcessStatusComp },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['objInputFirstLink']),

    textInput: {
      get() {
        return this.$store.state.strInputFirstLink
      },

      set(newVal) {
        this.$store.dispatch('set_homeTextField', newVal)
      }
    },
    btnText() {
      return this.objInputFirstLink ? 'Set ' + this.objInputFirstLink.add : ''
    }
  },
  created() {
  },
  mounted() {
    const userLink = localStorage.getItem('user_first_link')

    if (userLink !== null) {
      this.$store.dispatch('set_homeTextField', userLink)
    } else {
      this.$store.dispatch('set_homeTextField', this.$store.state.DEFAULT_strInputFirstLink)
    }
  },
  methods: {
    btnSet() {
      localStorage.setItem('user_first_link', this.textInput)
      this.$router.push('/dashboard/option1')
    }
  }
}
</script>

<style>
.HomeBigBox {
  background-color: rgba(244, 240, 220);
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.InnerHomeBigBox {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  border-radius: 6px;
  background-color: rgb(115, 254, 186, 0.9);
  width: 400px;
  height: 100vh;
}

.topBox {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* align-items: flex-start; */
  background-color: rgb(52, 241, 150);
  width: 360px;
  height: 250px;
  padding: 10px;
  border-radius: 6px;
}

.bottomBox {
  width: 360px;
}
</style>
