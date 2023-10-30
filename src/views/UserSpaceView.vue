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
import { reactive } from 'vue';

export default {
    name: 'UserSpaceView',
    components: {
        WebCard,
        UserProfileInfo,
        UserProfilePosts,
        UserProfileEdit,
    },
    setup() {
        const user = reactive({
            id: 1,
            username: "ChenMiaoQiu",
            follower: 0,
            is_follow: false,
        });

        const posts = reactive({
            count: 3,
            posts: [
                {
                    id: 1,
                    username: "ChenMiaoQiu",
                    context: "hahahaha",
                },
                {
                    id: 2,
                    username: "ChenMiaoQiu",
                    context: "hahahaha1",
                },
                {
                    id: 3,
                    username: "ChenMiaoQiu",
                    context: "hahahaha2",
                }
            ]
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
            follow,
            unfollow,
            PostAPost,
        }
    }
}
</script>