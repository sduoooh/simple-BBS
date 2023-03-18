<script setup>
import { ref, onMounted } from "vue"
import { useInfiniteScroll } from '@vueuse/core'
import { useRouter } from 'vue-router'
import * as marked from 'marked'

import { useUserState, beforePage } from "../data"
import { getCommentsByPostId, createComment } from "../api/comment"

const nowPageNum = ref(2)
const user = useUserState()
const props = defineProps(["PostId"])
const postCommentList = ref([])
const inputComment = ref("")

const router = useRouter()

async function load() {
    postCommentList.value.push(...(await getCommentsByPostId({postId:props.PostId, page:nowPageNum})))
    nowPageNum.value++
}

const handleSubmit = async () => {
    if (!inputComment.value) {
        alert('评论内容不可为空')
        return
    }
    try {
        console.log("is input:" , inputComment.value)
        const res = await createComment({
            content: inputComment.value,
            postId:  props.PostId
        })
    } catch (e) {
        alert('未知错误，发布失败')
    }
    inputComment.value = ""
    nowPageNum.value = 2
    postCommentList.value = await getCommentsByPostId({postId:props.PostId, page:1})
}

useInfiniteScroll(document, load, { distance: 10 })

onMounted(async () => {
    console.log(postCommentList.value)
    postCommentList.value.push(...(await getCommentsByPostId({postId:props.PostId, page:1})))
    console.log(postCommentList.value)
})

</script>

<template>
    <div>
        <div v-if="user.isLoggedIn">
            <div>
                <div text="xl" font="bold">发布评论</div>
                <mavon-editor mt="sm" v-model="inputComment"></mavon-editor>
                <div mt="sm" flex>
                    <div grow></div>
                    <ElButton type="primary" @click="handleSubmit">发布</ElButton>
                </div>
            </div>
        </div>
        <div v-else>
            要想发评论，请先 <ElButton link type="primary" @click="beforePage = props.PostId; router.push('/login')">登录</ElButton>
        </div>
        <ElDivider></ElDivider>
        <div>
            <div text="xl" font="bold">评论区</div>
            <ElTimeline style="margin: 15px;">
                <ElTimelineItem v-for="comment in postCommentList">
                    <ElCard>
                        <template #header>
                            <div flex>
                                <div>
                                    <span mx="1" text="lg">{{ comment.author?.username }}</span>
                                    <span text="gray">说：</span>
                                </div>
                                <div grow></div>
                                <div relative top="1.5" text="sm gray">
                                    {{ new Date(comment.publish_at * 1000).toLocaleString() }}
                                </div>
                            </div>
                        </template>
                        <div prose max-w-full v-html="marked.parse(comment.content)"></div>
                    </ElCard>
                </ElTimelineItem>
            </ElTimeline>
        </div>
    </div>
</template>