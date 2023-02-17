<template>
  <div class="autoCompBigBox">
    <!-- 上半区 -->
    <div class="rightSideTop ipCtrlBox">
      <div class="ipSlotBox">
        <div class="fourIpsBox">
          <v-text-field
            v-model="ip1"
            solo
            dense
          />
          <i class="circle" />
          <v-text-field
            v-model="ip2"
            solo
            dense
          />
          <i class="circle" />
          <v-text-field
            v-model="ip3"
            solo
            dense
          />
          <i class="circle" />
          <v-text-field
            v-model="ip4"
            solo
            dense
          />
        </div>
        <div class="textMidBox">
          To
        </div>
        <div class="fourIpsBox">
          <v-text-field
            v-model="ip5"
            solo
            dense
          />
          <i class="circle" />
          <v-text-field
            v-model="ip6"
            solo
            dense
          />
          <i class="circle" />
          <v-text-field
            v-model="ip7"
            solo
            dense
          />
          <i class="circle" />
          <v-text-field
            v-model="ip8"
            solo
            dense
          />
        </div>
      </div>
      <div class="autoBtnBox">
        <v-btn
          :disabled="flag_autoCmdBtn"
          :depressed="flag_autoCmdBtn"
          class="cmdBtnCommon"
          color="#9370DB"
          dark
          @click="btnClickSet"
        >set</v-btn>
        <v-btn
          :disabled="vListDataAuto.length==0"
          :depressed="vListDataAuto.length==0"
          :data-clipboard-text="strOutputToCopy"
          class="cmdBtnCommon tagCopyAuto"
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
      <div class="rightSideDisplayBox">
        <virtual-list1
          ref="vsl1"
          class="list-dynamic scroll-touch vlistDefault vlistAuto"
          :keeps="20"
          :data-key="'sid'"
          :data-sources="vListDataAuto"
          :data-component="itemComp1"
          :estimate-size="30"
          :item-class="'list-item-dynamic'"
          :bottom-threshold="2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Clipboard from 'clipboard'
import ipfr from 'ip-from-range'
import VirtualList1 from 'vue-virtual-scroll-list'
import Item1 from '../VscrollItem.vue'

export default {
  components: { 'virtual-list1': VirtualList1 },
  data() {
    return {
      itemComp1: Item1,
      testString: 'testString',
      flag_SET: false,
      inputIps: [], // IP 空格
      strObjInputLink: '', // 残缺的字符串link
      ip1: 1,
      ip2: 2,
      ip3: 3,
      ip4: 4,
      ip5: 5,
      ip6: 6,
      ip7: 7,
      ip8: 8
    }
  },
  computed: {
    ...mapState(['objInputFirstLink', 'vListDataAuto', 'flag_autoCmdBtn', 'strOutputToCopy'])
  },
  mounted() {
    // 填充ip格子, 分割 ip 地址段
    this.inputIps = this.objInputFirstLink.add.split('.')

    this.initIpOneToEight()
  },
  methods: {
    // 1 拼接出首尾两个完整ip
    // 2 用ipfr扩展出范围内所有ip
    btnClickSet() {
      let strFromIp = ''
      let strToIp = ''
      const array1 = [this.ip1, this.ip2, this.ip3, this.ip4, this.ip5, this.ip6, this.ip7, this.ip8]

      for (let i = 0; i < array1.length; i += 1) {
        if (i <= 3) {
          strFromIp = strFromIp.concat('.', array1[i])
        } else {
          strToIp = strToIp.concat('.', array1[i])
        }
      }

      strFromIp = strFromIp.substring(1)
      strToIp = strToIp.substring(1)

      const arrAutoIps = ipfr(strFromIp, strToIp).getIpAddresses()

      this.$store.dispatch('handle_IP2LINK', arrAutoIps)
    },
    btnClickCopy() {
      console.log('btnClickCopy()')
      const clipboard = new Clipboard('.tagCopyAuto')

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
    },
    initIpOneToEight() {
      // 若用数组，怎computed监听不到里面元素的变化，所以不行。
      this.ip1 = this.inputIps[0]
      this.ip2 = this.inputIps[1]
      this.ip3 = this.inputIps[2]
      this.ip4 = this.inputIps[3]
      this.ip5 = this.inputIps[0]
      this.ip6 = this.inputIps[1]
      this.ip7 = this.inputIps[2]
      this.ip8 = this.inputIps[3]
    }
  }
}
</script>

<style>
/* .autoCompBigBox {
} */

.ipCtrlBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* IP输入部分 */
.ipSlotBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.fourIpsBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.v-text-field__details {
  display: none;
}

.v-messages {
  display: none;
}

.circle {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 0 2px;
}

.circle:after {
  content: '';
  margin: 3px;
  display: table;
  width: 6px;
  height: 6px;
  background: rgb(0, 0, 0);
  border-radius: 50%;
}

.autoBtnBox {
  margin: 0 10px;
}

.vlistAuto {
  width: 800px;
}
</style>
