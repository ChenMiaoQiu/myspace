import $ from 'jquery';
import { jwtDecode } from 'jwt-decode';

const ModuleUser = {
    state: {
        username: "",
        id: "",
        photo: "",
        followerCount: 0,
        access: "",
        refresh: "",
        is_login: false,
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.followerCount = user.followerCount;
            state.photo = user.photo;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = user.is_login;
        },

        logoutUser(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.followerCount = 0;
            state.access = "";
            state.refresh = "";
            state.is_login = false;
            clearInterval(state.timer);
        },

        updateAccess(state, access) {
            state.access = access;
        }
    },
    actions: {
        login(context, data) {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/api/token/",
                type: "post",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    const { access, refresh } = resp;
                    const accessObj = jwtDecode(access);

                    // 定期刷新access 过期时间为5分钟
                    context.state.timer = setInterval(() => {
                        $.ajax({
                            url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                            type: "post",
                            data: {
                                refresh: context.state.refresh,
                            },
                            success(resp) {
                                context.commit("updateAccess", resp.access);
                            },
                            error() {
                                console.log("update access false");
                            }
                        });
                    }, 60 * 4.5 * 1000);

                    $.ajax({
                        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                        type: "get",
                        data: {
                            user_id: accessObj.user_id,
                        },
                        headers: {
                            'Authorization': "Bearer " + access,
                        },
                        success(resp) {
                            context.commit("updateUser", {
                                ...resp,
                                access: access,
                                refresh: refresh,
                                is_login: true,
                            });
                            data.success();
                        }
                    });
                },
                error() {
                    data.error();
                }
            });
        },

        logout(context) {
            context.commit("logoutUser");
        }
    },
    modules: {
    }
};

export default ModuleUser;