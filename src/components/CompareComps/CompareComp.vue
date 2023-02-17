<template>
  <div class="ip2lCompBigBox">
    <!-- 上半区 -->
    <div class="rightSideTop ip2lTopBox">
      <!-- <div class="ipRangeDisplayBox">
        <div>
          {{ arrayIPsCOPY[0] }}
        </div>
        <div class="textMidBox">
          To
        </div>
        <div>
          {{ arrayIPsCOPY[arrayIPsCOPY.length - 1] }}
        </div>
      </div> -->
      <div>
        注意新旧IP位置
      </div>
      <div class="ip2lBtnBox">
        <v-btn
          :disabled="vListDataCompare1.length==0"
          :depressed="vListDataCompare1.length==0"
          :data-clipboard-text="strOutputToCopy"
          class="cmdBtnCommon tagCopyIp2l"
          color="#9370DB"
          dark
          @click="btnClickCopy"
        >copy</v-btn>
        <v-btn
          class="cmdBtnCommon"
          color="#9370DB"
          dark
          @click="btnClickExit"
        >Exit</v-btn>
      </div>
    </div>
    <!-- 下半区 -->
    <!-- 下左 -->
    <div class="rightSideBottom">
      <div class="vtextareaBoxClass margin-right10">
        <div class="bgc-input">
          <v-textarea
            v-model="compareTextAreaNewIp"
            class="vTextareaCompare"
            height="569px"
            clearable
            clear-icon="mdi-close-circle"
            outlined
            name="input-7-4"
            label="New IPs"
            click:clear
          />
        </div>
      </div>
      <div class="vtextareaBoxClass bgc-input margin-right10">
        <div class="">
          <v-textarea
            v-model="compareTextAreaOldIp"
            class="vTextareaCompare"
            height="569px"
            clearable
            clear-icon="mdi-close-circle"
            outlined
            name="input-7-4"
            label="Old IPs"
            click:clear
          />
        </div>
      </div>
      <!-- 下右 -->
      <div class="bottomRightBox">
        <div class="rightSideDisplayBox margin-right10">
          <virtual-list2
            ref="vsl2"
            class="list-dynamic scroll-touch vlistDefault vlistCompare"
            :keeps="20"
            :data-key="'sid'"
            :data-sources="vListDataCompare2"
            :data-component="itemComp2"
            :estimate-size="30"
            :item-class="'list-item-dynamic'"
            :bottom-threshold="2"
          />
        </div>
        <div class="rightSideDisplayBox">
          <virtual-list2
            ref="vsl2"
            class="list-dynamic scroll-touch vlistDefault vlistCompare"
            :keeps="20"
            :data-key="'sid'"
            :data-sources="vListDataCompare1"
            :data-component="itemComp2"
            :estimate-size="30"
            :item-class="'list-item-dynamic'"
            :bottom-threshold="2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Clipboard from 'clipboard'
import VirtualList2 from 'vue-virtual-scroll-list'
import Item2 from '../VscrollItem.vue'

export default {
  components: { 'virtual-list2': VirtualList2 },
  data() {
    return {
      itemComp2: Item2
    }
  },
  computed: {
    ...mapState(['arrayIPsCOPY', 'vListDataCompare1', 'vListDataCompare2', 'flag_ip2lCmdBtn', 'strOutputToCopy', 'compareDiffIps']),

    compareTextAreaNewIp: {
      get() {
        return this.$store.state.compareInputNew
      },

      set(strAutoIps) {
        this.$store.dispatch('handle_compareInputNew', strAutoIps)
      }
    },

    compareTextAreaOldIp: {
      get() {
        return this.$store.state.compareInputOld
      },

      set(strAutoIps) {
        this.$store.dispatch('handle_compareInputOld', strAutoIps)
      }
    }
  },
  mounted() { },
  methods: {
    btnClickCopy() {
      console.log('btnClickCopy()')
      const clipboard = new Clipboard('.tagCopyIp2l')

      clipboard.on('success', (e) => {
        clipboard.destroy()
        console.log('clipboard-success-e->', e)
      })
      clipboard.on('error', (e) => {
        clipboard.destroy()
        console.log('clipboard-error-e->', e)
      })
    },
    btnClickExit() {
      this.$router.push('/')
      this.$store.commit('exit')
    }
  }
}
</script>

<style>
/* 上半区 */
.ip2lTopBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.ipRangeDisplayBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.ip2lBtnBox {
  margin: 0 10px;
}

/* 下半区 */
/* .vtextareaBoxClass {
} */

.vTextareaCompare {
  width: 250px;
  /* height在组件上设置 */
}

.bottomRightBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.vlistCompare {
  width: 250px;
}
</style>
