<script setup>
import { ref,onMounted } from "vue"
import { getPosts } from "../api/posts"
import { useRouter } from 'vue-router'
import * as marked from 'marked'
import { useInfiniteScroll } from '@vueuse/core'

const router = useRouter()
const cardList = ref([])
const nowPageNum = ref(2)


async function load() {
    cardList.value.push(...(await getPosts({ page: nowPageNum, size: 20 })))
    nowPageNum.value++
}

useInfiniteScroll(document, load, { distance: 10 })

onMounted(async () => {
    cardList.value.push(...(await getPosts({ page: 1, size: 20 })))
})
</script>

<template>
    <el-card mb="sm" v-for="card in cardList" max-w="960px" w="96/100" mx="auto">
        <template #header>
            <div flex items-center>
                <div text="xl" font="bold" w="70%">
                    {{ card.title.slice(0, 60) }}
                </div>
                <div grow></div>
                <div text="sm gray"> {{
                    `${card.author.username.slice(0, 8)} 发布于 ${new Date(
                        card.publish_at * 1000
                    ).toLocaleString()}`
                }}
                </div>
            </div>
        </template>
        <div flex items-center>
            <div v-html="marked.parse(card.summary)">
            </div>
        </div>
        <div mt="sm">
                <ElButton type="primary" link @click="router.push(`/posts/${card.id}`)">
                    查看全文
                </ElButton>
            </div>
    </el-card>
</template>