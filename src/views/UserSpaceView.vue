<template>
    <WebCard>
        <div class="row">
            <div class="col-3">
                <UserProfileInfo :user="user" @follow="follow" @unfollow="unfollow"></UserProfileInfo>
                <UserProfileEdit v-if="isMe" @PostAPost="PostAPost"></UserProfileEdit>
            </div>
            <div class="col-9">
                <UserProfilePosts :posts="posts" @deletePost="deletePost"></UserProfilePosts>
            </div>
        </div>
    </WebCard>
</template>
  
<script>
import WebCard from '@/components/WebCard.vue';
import UserProfileInfo from '@/components/UserProfile/UserProfileInfo.vue';
import UserProfilePosts from '@/components/UserProfile/UserProfilePosts.vue';
import UserProfileEdit from '@/components/UserProfile/UserProfileEdit.vue';
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import $ from 'jquery';

export default {
    name: 'UserSpaceView',
    components: {
        WebCard,
        UserProfileInfo,
        UserProfilePosts,
        UserProfileEdit,
    },
    setup() {
        const route = useRoute();
        const store = useStore();

        const userId = parseInt(route.params.userId);

        const user = reactive({});
        const posts = reactive({});

        //获取用户信息
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "get",
            data: {
                user_id: userId,
            },
            headers: {
                'Authorization': "Bearer " + store.state.user.access,
            },
            success(resp) {
                user.id = resp.id;
                user.username = resp.username;
                user.photo = resp.photo;
                user.is_follow = resp.is_followed;
                user.followerCount = resp.followerCount;
            }
        });

        // 获取用户所有发帖
        const getUserPost = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "get",
                data: {
                    user_id: userId,
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    console.log(resp);
                    posts.count = resp.length;
                    posts.posts = resp;
                }
            });
        }
        getUserPost();

        const updateFollowState = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "post",
                data: {
                    target_id: userId,
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success() {
                    console.log("关注成功");
                }
            });
        }

        const follow = () => {
            console.log("follow");
            if (user.is_follow) return;
            user.is_follow = true;
            user.followerCount++;
            updateFollowState();
        };

        const unfollow = () => {
            console.log("unfollow");
            if (!user.is_follow) return;
            user.is_follow = false;
            user.followerCount--;
            updateFollowState();
        }

        // 发帖
        const PostAPost = (content) => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "post",
                data: {
                    content: content
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success() {
                    getUserPost();
                }
            });
        }

        const deletePost = (postId) => {
            console.log("delete this", postId);
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "DELETE",
                data: {
                    post_id: postId,
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    console.log(resp.result);
                    getUserPost();
                }
            });
        }

        const isMe = computed(() => userId === store.state.user.id);
        user.isMe = isMe;

        return {
            user: user,
            posts: posts,
            userId: userId,
            store,
            isMe,
            follow,
            unfollow,
            PostAPost,
            deletePost,
        }
    }
}
</script>