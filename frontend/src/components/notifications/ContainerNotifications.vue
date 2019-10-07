<template lang="pug">
div.container-notifications.text-center(
    v-if="isShow"
)
    span.regular.font-body.container-notifications__inner(
        :class="`${ curNotification.color }-notification`"
    ) {{ curNotification.text }}
        
</template>

<script>
import { clearTimeout, setTimeout } from 'timers';
export default {
    name: 'ContainerNotifications',
    componentName: 'ContainerNotifications',
    data() {
        return {
            isShow: false,
            timeoutStart: undefined,
            timeoutEnd: undefined,
            timeoutNext: undefined,
            curNotification: {
                color: 'white',
                text: ''
            },
        };
    },
    methods: {
        nextNotification() {
            if (this.$store.state.notifications.length > 0) {
                this.clearTimeouts();
                this.curNotification = this.$store.state.notifications[0];
                this.timeoutStart = setTimeout(() => { this.isShow = true; }, 100);
                this.timeoutNext = setTimeout(() => { 
                    this.isShow = false;
                    this.$store.commit('removeFirstNotification');
                    this.nextNotification();
                }, 2500);
            }
        },
        clearTimeouts() {
            if (this.timeoutStart !== undefined) {
                clearTimeout(this.timeoutStart);
                this.timeoutStart = undefined;
            }
            if (this.timeoutEnd !== undefined) {
                clearTimeout(this.timeoutEnd);
                this.timeoutEnd = undefined;
            }
            if (this.timeoutNext !== undefined) {
                clearTimeout(this.timeoutNext);
                this.timeoutNext = undefined;
            }
        }
    },
    mounted() {
        this.nextNotification();
    },
    beforeDestroy() {
        this.clearTimeouts();
        this.$store.commit('removeAllNotification');
    }
}
</script>

<style lang="scss">
.container-notifications {
    animation: notification-animation 2.4s ease-in-out; // styles/styleGuide.scss
    height: 60px;
    width: 100%;
    left: 0;
    right: 0;
    z-index: 2000;
    position: fixed;
    bottom: -60px;
    &__inner {
        padding: 20px;
        &.black-notification {
            background-color: $black;
            color: $white;
        }
        &.white-notification {
            background-color: $white;
            color: $black;
        }
        &.green-notification {
            color: $white;
            background-color: $green;
        }
        &.red-notification {
            color: $white;
            background-color: $red;
        }
    }
}
</style>