<template>
<div class="number-manager">
    <span class="number-manager-less" :class="{ 'number-manager-disabled': number === 1 }" @click="onLessClick">-</span>
    <span class="number-manager-number">{{ number }}</span>
    <span class="number-manager-add" @click="onAddClick">+</span>
</div>
</template>

<script>
export default {
    
    props: {
        initialNumber: {
            type: Number,
            default: 1,
        },
    },

    data: function () {
        return {
            number: 1,
        };
    },

    watch: {
        initialNumber: function (newValue) {
            this.number = newValue;
        },

        number: function (newValue) {
            this.$emit("onChangeNumber", newValue);
        },
    },

    methods: {
        onLessClick: function () {
            if (this.number === 1) {
                return;
            }
            this.number -= 1;
        },

        onAddClick: function () {
            this.number += 1;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.number-manager {
    display: flex;
    font-size: $infoSize;
    height: px2rem(20);

    span {
        font-weight: 500;
        width: px2rem(30);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &-number {
        background-color: $bgColor;
        padding: 0 px2rem(4);
    }

    &-disabled {
        color: $hintColor;
    }
}
</style>
