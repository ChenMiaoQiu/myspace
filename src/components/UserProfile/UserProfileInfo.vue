<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <img class="img-fluid" :src="user.photo">
                </div>
                <div class="col-9">
                    <div class="username"> {{ user.username }} </div>
                    <div class="fans"> 粉丝数: {{ user.followerCount }} </div>
                    <div v-if="!user.isMe">
                        <button @click="follow" v-if="!user.is_follow" type="button"
                            class="btn btn-info btn-sm">+关注</button>
                        <button @click="unfollow" v-if="user.is_follow" type="button"
                            class="btn btn-danger btn-sm">取消关注</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: "UserProfileInfo",
    props: {
        user: {
            type: Object,
            required: true,
        }
    },

    setup(props, context) {
        const follow = () => {
            context.emit('follow');
        };

        const unfollow = () => {
            context.emit('unfollow');
        };

        return {
            props,
            follow,
            unfollow,
        }
    }
}
</script>

<style scoped>
img {
    border-radius: 50%;
}

.username {
    font-weight: bold;
}

.fans {
    font-size: 12px;
    color: rgb(114, 113, 113);
}

button {
    padding: 2px 8px;
}
</style>