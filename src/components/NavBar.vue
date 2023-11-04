<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <router-link class="navbar-brand" :to="{ name: 'home' }">Myspace</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" :to="{ name: 'home' }">首页</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'userlist' }">用户列表</RouterLink>
                    </li>
                    <!-- <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'userspace', params: { userId: 2 } }">用户动态</RouterLink>
                    </li> -->
                </ul>
                <ul v-if="!store.state.user.is_login" class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'register' }">注册</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'login' }">登录</RouterLink>
                    </li>
                </ul>
                <ul v-else class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'userspace', params: { userId: store.state.user.id } }">
                            {{ store.state.user.username }}
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link" @click="logout" style="cursor: pointer;">注销</div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { useStore } from 'vuex';
import { RouterLink } from 'vue-router';
import router from '@/router';

export default {
    name: "NavBar",
    components: { RouterLink },
    setup() {
        const store = useStore();

        const logout = () => {
            store.dispatch("logout");
            router.push({ name: "home" });
        };

        return {
            store,
            logout
        }
    }
}
</script>

<style scoped></style>