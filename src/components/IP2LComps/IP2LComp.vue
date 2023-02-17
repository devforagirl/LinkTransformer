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
      <!-- <div class="nameCustomBox">
        <div class="prefixBox">
          <v-text-field
            v-model="textPrefixInput"
            class="vTextFieldPrefix"
            height="4px"
            label="name prefix"
            placeholder="name prefix"
            color="white"
            dense
            flat
            outlined
            clearable
          />
          <span class="prefixText">+ IP address</span>
        </div>
        <div>
          直接复制新的ip段即可生成新的连接
        </div>
      </div> -->
      <div class="ip2lBtnBox">
        <v-btn
          class="cmdBtnCommon"
          color="#9370DB"
          dark
          @click="btnClickSet"
        >Set</v-btn>
        <v-btn
          :disabled="vListDataIp2l.length==0"
          :depressed="vListDataIp2l.length==0"
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
            v-model="singleTextArea"
            class="vTextareaIp2l"
            height="569px"
            clearable
            clear-icon="mdi-close-circle"
            outlined
            name="input-7-4"
            label="One IP each line"
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
            :data-sources="vListDataIp2l"
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
    ...mapState(['arrayIPsCOPY', 'vListDataIp2l', 'flag_ip2lCmdBtn', 'strOutputToCopy']),

    singleTextArea: {
      get() {
        return this.$store.state.strSingleInput
      },

      set(newValue) {
        this.$store.dispatch('handle_singleInput', newValue)
      }
    }

    // textPrefixInput: {
    //   get() {
    //     return this.$store.state.textPrefixInput
    //   },

    //   set(newVal) {
    //     this.$store.commit('textPrefixInput', newVal)
    //   }
    // }
  },
  mounted() { },
  methods: {
    btnClickSet() {
      const tempArray = this.generateIpArray()

      this.$store.dispatch('handle_IP2LINK', tempArray)
    },
    generateIpArray() {
      // const arrAllIpRange = []

      // 分行
      const arrResult1 = this.singleTextArea.split('\n')

      // 去空,去重
      const modArrResult1 = arrResult1.filter((item, index, arr) => {
        return item.length > 0 && arr.indexOf(item, 0) === index
      })

      return modArrResult1

      // this.checkedIps.map(x => {
      //   const tempX = x.split('.')
      //   const ipFirst3 = tempX[0] + '.' + tempX[1] + '.' + tempX[2] + '.'

      //   const startIp = ipFirst3 + this.ip1_4
      //   const endIp = ipFirst3 + this.ip2_4

      //   const oneIpRange = ipfr(startIp, endIp).getIpAddresses()

      //   oneIpRange.forEach(y => arrAllIpRange.push(y))
      // })

      // return arrAllIpRange
    },
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

.nameCustomBox {
  /* border: 2px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: aliceblue;
}

.prefixBox {
  /* border: 2px solid rgb(227, 247, 139); */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.prefixText {
  margin-left: 10px;
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

/* .bottomRightBox {
} */

.vlistIp2l {
  width: 800px;
}
</style>
