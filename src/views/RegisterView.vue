<template>
    <WebCard>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username">
                    </div>
                    <div class="mb-3">
                        <label for="password">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                    <div class="mb-3">
                        <label for="secondPassword">重新输入密码</label>
                        <input v-model="secondPassword" type="secondPassword" class="form-control" id="secondPassword">
                    </div>
                    <div class="errmsg"> {{ errmsg }} </div>
                    <button type="submit" class="btn btn-primary">注册</button>
                </form>
            </div>
        </div>
    </WebCard>
</template>

<script>
import { ref } from 'vue';
import WebCard from '../components/WebCard';
import { useStore } from 'vuex';
import $ from 'jquery'
import router from '@/router';

export default {
    name: 'RegisterView',
    components: {
        WebCard,
    },

    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let secondPassword = ref('');
        let errmsg = ref('');

        const register = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/user/",
                type: "post",
                data: {
                    username: username.value,
                    password: password.value,
                    password_confirm: secondPassword.value,
                },
                success(resp) {
                    if (resp.result === "success") {
                        store.dispatch("login", {
                            username: username.value,
                            password: password.value,
                            success() {
                                router.push({ name: "userlist" });
                            },
                            error() {
                                errmsg.value = "注册成功但是登录失败,请自行登录";
                            }
                        });
                    } else {
                        errmsg.value = resp.result
                    }
                }
            });
        }

        return {
            username,
            password,
            secondPassword,
            errmsg,
            register,
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