<template>
    <div class="card">
        <div class="card-body">
            <div v-for="post in posts.posts" :key="post.id">
                <div class="card postCard">
                    <div class="card-body">
                        {{ post.content }}
                        <button v-if="props.user.isMe" @click="deletePost(post.id)" type="button"
                            class="btn btn-danger btn-sm">删除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "UserProfilePosts",
    props: {
        posts: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true
        }
    },
    setup(props, context) {
        const deletePost = (id) => {
            context.emit("deletePost", id);
        }

        return {
            deletePost
        }
    }
}
</script>

<style scoped>
.postCard {
    margin-top: 5px;
}

.btn {
    float: right;
}
</style>