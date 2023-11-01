<template>
    <WebCard>
        <div v-for="user in users" :key="user.id" @click="openUserSpace(user.id)">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-2">
                            <img class="img-fluid" :src="user.photo">
                        </div>
                        <div class="col-9">
                            <div class="username"> {{ user.username }} </div>
                            <div class="follower"> 粉丝数: {{ user.followerCount }} </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </WebCard>
</template>

<script>
import WebCard from '../components/WebCard';
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import $ from 'jquery';


export default {
    name: 'UserListView',
    components: {
        WebCard,
    },

    setup() {
        const store = useStore();
        let users = ref([]);

        $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
            type: 'get',
            success(resp) {
                users.value = resp;
            }
        });

        const openUserSpace = userId => {
            if (store.state.user.is_login) {
                router.push({
                    name: "userspace",
                    params: {
                        userId: userId
                    }
                });
            } else {
                router.push({
                    name: "login"
                });
            }
        }

        return {
            users,
            openUserSpace,
        }
    }
}
</script>

<style scoped>
.img-fluid {
    border-radius: 50%;
    width: 50%;
}

.card {
    margin-top: 10px;
}

.card:hover {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    transition: 0.3s;
    cursor: pointer;
}
</style>