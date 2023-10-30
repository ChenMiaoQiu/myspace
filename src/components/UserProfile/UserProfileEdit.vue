<template>
    <div class="card">
        <div class="card-body">
            <div class="mb-3">
                <label for="edit-post" class="form-label" id="title">写帖子</label>
                <textarea v-model="content" class="form-control" id="edit-post" rows="3"></textarea>
                <button @click="PostAPost" type="button" class="btn btn-primary edit-button btn-sm">发帖</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: "UserProfileEdit",

    setup(props, context) {
        let content = ref('');

        const PostAPost = () => {
            if (!content.value) return;
            context.emit('PostAPost', content.value);
            content.value = "";
        }

        return {
            content,
            PostAPost,
        }
    }
}
</script>

<style scoped>
.card {
    margin-top: 10px;
}

.form-label {
    display: flex;
    justify-content: center;
}

.edit-button {
    margin-top: 10px;
    margin-left: 40%;
}
</style>