<template>
    <div class="gif">
        <v-icon class="gif__close" @click="$emit('close')">mdi-close</v-icon>
        <img
            class="gif__img"
            :src="gif.images.original.url"
            :alt="gif.title"
            @load="isImageLoad = true"
            :hidden="!isImageLoad"
        />
        <v-skeleton-loader v-if="!isImageLoad" type="image" class="gif__skeleton"></v-skeleton-loader>
        <god-url-copier class="gif__copier" :url="gif.images.original.url" />
    </div>
</template>

<script>
import UrlCopier from '@/components/UrlCopier.vue';

export default {
    components: {
        'god-url-copier': UrlCopier
    },
    data() {
        return {
            isImageLoad: false,
        }
    },
    props: ['gif']
}
</script>

<style lang="scss" scoped>
.gif {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 96px);
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;

    &__close {
        position: absolute;
        top: 0px;
        right: 0px;
        font-size: 40px;
        padding: 20px;
    }

    &__img {
        max-width: 100%;
        max-height: calc(100vh - 200px);
    }

    &__skeleton {
        width: 80%;
    }

    &__giphy {
        position: absolute;
        bottom: 10px;
        right: 20px;
    }

    &__copier {
        position: absolute;
        bottom: 10px;
        right: 25px;
    }
}
</style>
