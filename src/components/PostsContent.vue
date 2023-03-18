<script setup>
    import { ref,onMounted } from "vue"

    import { getPost } from '../api/posts'
    import * as marked from 'marked'

    const props = defineProps(["PostId"])
    const postContent = ref({})

    onMounted(async () => {
        console.log(props.PostId)
        postContent.value= await getPost({id: props.PostId})
        
        console.log(postContent.value)
})
</script>

<template>
  <div prose max-w-full>
    <h1>{{ postContent.title }}</h1>
    <div flex>
      <div grow></div>
      <span text="gray">
        {{
          `${postContent.author?.username} 于 ${new Date(
            postContent.publish_at * 1000
          ).toLocaleString()}`
        }}
      </span>
    </div>
    <div v-html="marked.parse(postContent.content ?? '')"></div>
  </div>
</template>