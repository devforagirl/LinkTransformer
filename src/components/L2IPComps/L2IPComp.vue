<template>
  <div class="ip2lCompBigBox">
    <!-- 上半区 -->
    <div class="rightSideTop ip2lTopBox">
      <div class="ipRangeDisplayBox">
        <div>
          {{ arrayIPsCOPY[0] }}
        </div>
        <div class="textMidBox">
          To
        </div>
        <div>
          {{ arrayIPsCOPY[arrayIPsCOPY.length - 1] }}
        </div>
      </div>
      <!-- <div>
        直接复制新的ip段即可生成新的连接
      </div> -->
      <div class="ip2lBtnBox">
        <v-btn
          :disabled="vListDataL2ip.length==0"
          :depressed="vListDataL2ip.length==0"
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
    <div class="rightSideBottom">
      <div class="bottomLeftBox margin-right10">
        <div class="inputTextAreaBox bgc-input">
          <v-textarea
            v-model="l2ipTextArea"
            class="vTextareaIp2l"
            height="569px"
            clearable
            clear-icon="mdi-close-circle"
            outlined
            name="input-7-4"
            label="One Link each line"
            click:clear
          />
        </div>
      </div>
      <div class="bottomRightBox">
        <div class="rightSideDisplayBox">
          <virtual-list2
            ref="vsl2"
            class="list-dynamic scroll-touch vlistDefault vlistIp2l"
            :keeps="20"
            :data-key="'sid'"
            :data-sources="vListDataL2ip"
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
    ...mapState(['arrayIPsCOPY', 'vListDataL2ip', 'flag_ip2lCmdBtn', 'strOutputToCopy']),

    l2ipTextArea: {
      get() {
        return this.$store.state.strL2ipInput
      },

      set(strLinks) {
        this.$store.dispatch('handle_LINK2IP', strLinks)
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
/* .bottomLeftBox {
  background-color: rgb(228, 220, 147);
} */

.vTextareaIp2l {
  width: 250px;
  /* height在组件上设置 */
}

.vlistIp2l {
  width: 800px;
}
</style>
