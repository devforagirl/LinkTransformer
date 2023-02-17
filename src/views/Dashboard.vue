<template>
  <div class="DashboardBigBox">
    <div class="leftBox">
      <div class="leftTopBox">
        <CommandComp />
      </div>
      <div class="leftBottomBox">
        <LinkDetailComp />
      </div>
    </div>
    <div class="rightBox">
      <router-view name="a" />
    </div>
  </div>
</template>

<script>
import LinkDetailComp from '../components/LinkDetailComp.vue'
import CommandComp from '../components/CommandComp.vue'

export default {
  components: { LinkDetailComp, CommandComp }
}
</script>

<style>
.DashboardBigBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background-color: rgb(244, 240, 220);
  padding: 30px 40px 30px 30px;
  height: 100vh;
  width: 100vw;
}

.leftBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: rgb(115, 254, 186, 0.9);
  height: 800px;
  width: 400px;
  padding: 20px;
  border-radius: 6px;
}

.leftTopBox {
  background-color: rgb(52, 241, 150);
  width: 100%;
  padding: 10px;
  border-radius: 6px;
}

.rightBox {
  background-color: rgb(214, 175, 232, 0.9);
  height: 800px;
  width: 70vw;
  padding: 20px;
  border-radius: 6px;
}

/* 右侧控制区公共样式 */
.flex-row {
  display: flex;
  flex-direction: row;
}

.textMidBox {
  margin: 0 40px;
  color: white;
  font-weight: 800;
}

.bgc-input {
  background-color: #26c6d0;
}
.margin-right10 {
  margin-right: 10px;
}

.rightSideTop {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 130px;
  background-color: rgb(202, 147, 228);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 10px;
}

.rightSideBottom {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  height: 590px;
  background-color: rgb(202, 147, 228);
  padding: 10px;
  border-radius: 6px;
}

/* vlist部分 */
.rightSideDisplayBox {
  background-color: rgb(145, 143, 143);
  color: rgb(150, 150, 150);
  height: 100%;
}

.list-dynamic {
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
}

.list-item-dynamic {
  display: flex;
  align-items: center;
}

.vlistDefault {
  background-color: rgb(0, 0, 0);
  height: 570px;
}

/* 按钮部分 */
.cmdBtnCommon {
  margin-right: 20px;
}
</style>
