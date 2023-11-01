<template>
    <WebCard>
        <div class="row">
            <div class="col-3">
                <UserProfileInfo :user="user" @follow="follow" @unfollow="unfollow"></UserProfileInfo>
                <UserProfileEdit @PostAPost="PostAPost"></UserProfileEdit>
            </div>
            <div class="col-9">
                <UserProfilePosts :posts="posts"></UserProfilePosts>
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

        const userId = route.params.userId;

        const user = reactive({});
        const posts = reactive({});

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
                user.is_follow = resp.is_follow;
                user.followerCount = resp.followerCount;
            }
        });

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

        const follow = () => {
            if (user.is_follow) return;
            user.is_follow = true;
            user.follower++;
        };

        const unfollow = () => {
            if (!user.is_follow) return;
            user.is_follow = false;
            user.follower--;
        }

        const PostAPost = (content) => {
            posts.count++;
            posts.posts.unshift({
                id: posts.count,
                username: "ChenMiaoQiu",
                context: content,
            });
        }

        return {
            user: user,
            posts: posts,
            userId: userId,
            store,
            follow,
            unfollow,
            PostAPost,
        }
    }
}
</script>