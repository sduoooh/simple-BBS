<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDraggable } from '@vueuse/core'
import { register } from '~/api/user'
const check = ref(null)
const router = useRouter()
const formEl = ref()
const checkStatus = ref(false)
const XMax = 1200
const YMax = 350
const randomMess = Math.random()
const checkSite = ref({ "x": 40, "y": 40 })
const inputSite = ref({ "x": 500, "y": 500 })
const form = ref({
  username: '',
  password: ''
});
const rules = ref({
  username: [{ required: true, message: '用户名不可为空' }],
  password: [{ required: true, message: '密码不可为空' }]
})
function getRandomInt(max) {
  return Math.floor(Math.random() * max / randomMess);
}
function handleRegister() {
  checkStatus.value = true
  checkSite.value.x = getRandomInt(XMax)
  checkSite.value.y = getRandomInt(YMax)
  setTimeout(() => {
    if (inputSite.value.x / randomMess <= checkSite.value.x + 50 && inputSite.value.x / randomMess >= checkSite.value.x - 50) {
      if (inputSite.value.y / randomMess <= checkSite.value.y + 50 && inputSite.value.y / randomMess >= checkSite.value.y - 50) {
        Register()
      }
    }
    else {
      alert("人机检验失败，请重试。")
      form.value = {
        username: '',
        password: ''
      }
      checkStatus.value = false
    }
  }, 20000)
}
const { style } = useDraggable(check, {
  initialValue: { x: 500, y: 500 },
  onMove: (position) => {
    inputSite.value.x = position.x
    inputSite.value.y = position.y
  },
  onEnd: (position) => {
    if (position.x / randomMess <= checkSite.value.x + 50 && position.x / randomMess >= checkSite.value.x - 50) {
      if (position.y / randomMess <= checkSite.value.y + 50 && position.y / randomMess >= checkSite.value.y - 50) {
        Register()
      }
    }
    else {
      alert("人机检验失败，请重试。")
      form.value = {
        username: '',
        password: ''
      }
      checkStatus.value = false
    }
  }

})

const Register = async () => {
  if (!formEl) {
    return
  }
  if (!(await formEl.value.validate(() => { }))) {
    return
  }
  try {
    await register(form.value);
    alert('注册成功')
    router.push('/login')
  } catch (e) {
    alert('用户名已被注册')
  }
}

</script>

<template>
  <div>
    <ElCard header="注册" shadow="always" max-w="360px" mx-auto>
      <ElForm ref="formEl" :model="form" :rules="rules" label-width="72px">
        <ElFormItem label="用户名" prop="username">
          <ElInput v-model="form.username"></ElInput>
        </ElFormItem>

        <ElFormItem label="密码" prop="password">
          <ElInput v-model="form.password" type="password"></ElInput>
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" @click="handleRegister">注册</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
    <div v-if="checkStatus">
      <div flex items-center h="full">
        <div grow></div>
        <div text="sm gray"> 你应该将于下方出现的方块拖到 <b>x：{{ checkSite.x }} y：{{ checkSite.y }}</b> 处以通过验证 </div>
        <div grow></div>
      </div>
      <div flex items-center h="full">
        <div grow></div>
        <div shadow ref="check" text="sm gray" :style="style" style="position: fixed"> 该方块处于： <b>x：{{
          inputSite.x / randomMess }} y：{{ inputSite.y / randomMess }}</b> </div>
        <div grow></div>
      </div>
    </div>
  </div>
</template>