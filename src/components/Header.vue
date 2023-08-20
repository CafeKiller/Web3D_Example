<template>
  <div class="header" :class="{ hide: store.state.isFullscreen }">
      <!--  Logo start  -->
      <div class="logo">
          <img src="@/assets/img/logo-small.jpg" alt="logo">
      </div>
      <!--  Logo end  -->
      <!--  搜索模块 start    -->
      <a-input-search class="header-input"
        @search="onSearch"
      />
      <!--  搜索模块 end    -->
      <!--  菜单选择模块 start    -->
      <a-menu mode="horizontal">
          <a-menu-item>
              <template #icon>
                  <QuestionCircleOutlined />
              </template>
              帮助
          </a-menu-item>
          <a-menu-item>
              <template #icon>
                  <ShopOutlined />
              </template>
              门店
          </a-menu-item>
          <a-sub-menu>
              <template #icon>
                  <UserOutlined />
              </template>
              <template #title>账户</template>
          </a-sub-menu>
          <a-sub-menu>
              <template #icon>
                  <CarOutlined />
              </template>
              <template #title>购物车</template>
          </a-sub-menu>
      </a-menu>
      <!--  菜单选择模块 end     -->

  </div>
</template>

<script setup>
import {CarOutlined, UserOutlined, ShopOutlined, QuestionCircleOutlined} from '@ant-design/icons-vue'
import {useStore} from "vuex";

const store = useStore()
// 商品搜索
const onSearch = (value) => {
    console.log(value)
}
</script>

<style lang="less" scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 0 10px #cccccc;
  z-index: 1000;
  transition: all .5s ease-in;
}
.header.hide{
    transform: translate(0, -100%);
}
.logo{
  margin: 0 20px;
  img{
    height: 30px;
  }
}
.header-input{
  margin-right: 20px;
  padding: 0 20px;
  display: flex;
  flex: 1;
  height: 40px;
  align-items: center;
}
</style>
