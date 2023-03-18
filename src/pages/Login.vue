<script setup>
import { RouterLink } from 'vue-router'

import UserLogin from "../components/UserLogin.vue"

</script>

<template>
    <div>
        <el-container>
            <el-header shadow="always">
                <div flex items-center h="full">
                    <RouterLink text-5 to="/">&lt;</RouterLink>
                </div>
            </el-header>
            <el-main>
                <div max-w="960px" w="96/100" mx="auto">
                    <UserLogin />
                </div>
            </el-main>
        </el-container>
    </div>
</template>