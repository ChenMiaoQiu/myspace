<template>
    <WebCard>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username">
                    </div>
                    <div class="mb-3">
                        <label for="password">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                    <div class="errmsg"> {{ errmsg }} </div>
                    <button type="submit" class="btn btn-primary">登录</button>
                </form>
            </div>
        </div>
    </WebCard>
</template>

<script>
import WebCard from '../components/WebCard';
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

export default {
    name: 'LoginView',
    components: {
        WebCard,
    },

    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let errmsg = ref('');

        const login = () => {
            errmsg.value = "";
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                    router.push({ name: "userlist" });
                },
                error() {
                    errmsg.value = "用户名或密码错误";
                },
            });
        }

        return {
            username,
            password,
            errmsg,
            login,
        }
    }
}
</script>

<style scoped>
.btn {
    width: 100%;
}

.errmsg {
    color: red;
}
</style>