<script setup>
import { RouterLink, useRouter } from 'vue-router'

import Cards from "../components/Cards.vue"
import { useUserState, handleLogout, beforePage } from "../data"

const user = useUserState()
const router = useRouter()

beforePage.value = false

</script>

<template>
    <div>
        <el-container>
            <el-header shadow="always">
                <div flex items-center h="full">
                    <RouterLink text-5 to="/">Simple BBS</RouterLink>
                    <div grow></div>
                    <template v-if="user.isLoggedIn">
                        <span mx-sm>
                            <span text="gray xs">{{ '登录为 ' }}</span>
                            <span>
                                {{ user.username }}
                            </span>
                        </span>
                        <ElButton link type="primary" @click="router.push('/posts/create')">
                            发帖
                        </ElButton>
                        <ElButton link type="danger" @click="handleLogout">登出</ElButton>
                    </template>
                    <ElButton v-else link type="primary" @click="beforePage = false; router.push('/login')">
                        登录
                    </ElButton>
                </div>
            </el-header>
            <el-main>
                <div max-w="960px" w="96/100" mx="auto">
                    <Cards />
                </div>
            </el-main>
            <el-footer>
                <div text="sm center gray">真的一滴都没有啦...</div>
            </el-footer>
        </el-container>
    </div>
</template>

