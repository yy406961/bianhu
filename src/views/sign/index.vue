<template>
    <div class="sign__container">
        <div class="sign__content card">
            <div class="sign__systemName">{{ systemName }}</div>
            <div class="sign__systemDescribe">
                {{ describeMsg }}编乎，分享你刚编的故事
            </div>
            <div class="sign__inputContent">
                <div class="sign__inputWrap">
                    <input
                        type="text"
                        placeholder="请输入用户名"
                        v-model="loginForm.userName"
                    />
                </div>
                <div class="sign__inputWrap">
                    <input
                        type="password"
                        placeholder="请输入密码"
                        v-model="loginForm.password"
                    />
                </div>
                <div class="sign__inputWrap" v-if="!isSignIn">
                    <input
                        type="password"
                        placeholder="请再次输入密码"
                        v-model="loginForm.passwordRepeat"
                    />
                </div>
                <div class="sign__checkboxWrap" v-if="isSignIn">
                    <input
                        class="sign__checkbox"
                        type="checkbox"
                        v-model="pwdChecked"
                        id="checkbox"
                    />
                    <label for="checkbox" class="sign__checkboxLabel"
                        >记住密码</label
                    >
                </div>
                <el-button
                    type="primary"
                    class="sign__signBtn"
                    @click="Verification"
                    ref="btnLogin"
                >
                    {{ describeMsg }}
                </el-button>
            </div>
            <div class="sign__switch">
                {{ switchMsg }}？<span
                    class="sign__signSwitch"
                    @click="signSwitch"
                    v-text="signSwitchMsg"
                ></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ajax, storage } from '@/common/index'
import { setCookies, getCookies, deleteCookies } from '@/utils/cookiesUtil'
@Component({
    components: {}
})
export default class sign extends Vue {
    private systemName: string = '编乎'
    private signInStr: string = '登陆' // 登陆
    private signUpStr: string = '注册' // 注册
    private loginForm: any = {
        userName: '',
        password: '',
        passwordRepeat: ''
    }
    private pwdChecked: boolean = true // 记住密码相关
    private switchMsg: string = '没有账号' // 没有账号 / 已有账号
    private isSignIn: boolean = true // 是否是登陆 true登陆 / false注册
    private describeMsg: string = this.signInStr
    private signSwitchMsg: string = this.signUpStr

    mounted() {
        document.addEventListener(
            'keyup',
            function(e: any) {
                if (this.$refs.btnLogin && e.keyCode === 13) {
                    this.Verification()
                }
            }.bind(this),
            false
        )
        this.loadAccountInfo()
    }
    // 输入验证
    Verification() {
        let { userName, password, passwordRepeat } = this.loginForm
        if (userName === '') {
            this.$message('请输入用户名！')
            return
        }
        if (password === '') {
            this.$message('请输入密码！')
            return
        }
        // 如果是注册，还要验证 passwordRepeat
        if (!this.isSignIn) {
            if (passwordRepeat === '') {
                this.$message('请再次输入密码！')
                return
            }
            if (password !== passwordRepeat) {
                this.$message('两次输入的密码不一致！')
                return
            }
            // 验证成功，调用注册接口
            this.signUpFunc()
        } else {
            // 验证成功，调用登录接口
            this.signInFunc()
        }
    }
    // 登陆
    signInFunc() {
        ajax.post('sign/signIn', this.loginForm)
            .then((resp: any) => {
                this.$emit('change', true)
                this.$router.push({ path: '/' })
                storage.session.set('lastuser', resp.data.userId)
                this.disposeCookies()
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    // 注册
    signUpFunc() {
        ajax.post('sign/signUp', this.loginForm)
            .then((resp: any) => {
                this.signSwitch()
                let { data } = resp
                this.loginForm.userName = data.userName
                this.loginForm.password = data.passWord
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
    // 登陆注册切换
    signSwitch() {
        this.isSignIn = !this.isSignIn
        if (this.isSignIn) {
            // 登陆
            this.loginForm = {
                userName: '',
                password: '',
                passwordRepeat: ''
            }
            this.describeMsg = this.signInStr
            this.signSwitchMsg = this.signUpStr
            this.switchMsg = '没有账号'
            this.$router.push({
                path: '/signin'
            })
        } else {
            // 注册
            this.loginForm = {
                userName: '',
                password: '',
                passwordRepeat: ''
            }
            this.describeMsg = this.signUpStr
            this.signSwitchMsg = this.signInStr
            this.switchMsg = '已有账号'
            this.$router.push({
                path: '/signup'
            })
        }
    }
    /**
     * 记住密码 cookies处理
     * disposeCookies
     * @return null
     */
    disposeCookies() {
        if (this.pwdChecked) {
            setCookies(this.loginForm)
        } else {
            deleteCookies(this.loginForm)
        }
    }
    /**
     * 读取cookie中的账号信息
     * 如果有userName的话，则说明该用户之前勾选了记住密码的功能，则需要自动填上账号密码
     * @return {[type]} [description]
     */
    loadAccountInfo() {
        let userName = getCookies('userName')
        let password = getCookies('password')
        // 如果cookie里没有账号信息
        if (userName !== undefined && password !== undefined) {
            // 如果cookie里有账号信息
            this.loginForm.userName = userName
            this.loginForm.password = password
            this.pwdChecked = true
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.sign {
    &__container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: url('../../assets/sign/signbg.jpeg') no-repeat;
        background-size: 100% 100%;
    }
    &__content {
        width: 30%;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 0;
        border-radius: 2px 0 0 2px;
    }
    &__systemName {
        @include systemName;
        margin-bottom: 20px;
        padding-top: 30px;
    }
    &__systemDescribe {
        font-size: 20px;
        color: $hight-fColor;
    }
    &__inputContent {
        padding: 0 30px 30px;
    }
    &__inputWrap {
        margin: 20px 0;
        border-bottom: 1px solid #ebebeb;
        input {
            height: 48px;
            width: 100%;
            border: none;
            font-size: $con-size;
            &:focus {
                outline: none;
            }
        }
    }
    &__checkboxWrap {
        height: 48px;
        width: 100%;
        text-align: left;
    }
    &__checkbox {
        margin-right: 12px;
        position: relative;
        top: 2px;
        border-color: $hight-fColor;
        background: linear-gradient(
            to right,
            rgba(17, 141, 191, 0.1),
            rgba(17, 141, 191, 0.8)
        );
    }
    &__checkboxLabel {
        cursor: pointer;
    }
    &__signBtn {
        height: 36px;
        width: 100%;
        letter-spacing: 10px;
        margin-top: 20px;
    }
    &__switch {
        height: 58px;
        line-height: 58px;
        text-align: center;
        margin: 0 auto;
        background-color: $bg-color;
        border-top: 1px solid #ebebeb;
    }
    &__signSwitch {
        color: $hover-fColor;
        cursor: pointer;
    }
}
</style>
