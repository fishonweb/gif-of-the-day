<template>
    <v-app id="sandbox">
        <god-drawer :isDrawerMini="isDrawerMini"></god-drawer>

        <v-app-bar :clipped-left="true" app dense>
            <v-btn icon @click="isDrawerMini = !isDrawerMini">🍔</v-btn>

            <v-toolbar-title>GIF OF THE DAY</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-chip small class="ma-2" color="red" text-color="white">alpha</v-chip>
        </v-app-bar>

        <v-content>
            <v-overlay opacity="1" absolute v-if="status === 'loading'">
                <v-progress-circular indeterminate size="64" color="lime"></v-progress-circular>
            </v-overlay>

            <v-overlay
                opacity="1"
                absolute
                v-if="status !== 'loading' && !organizationId && $route.meta && $route.meta.requireOrganization"
            >
                <god-not-accepted></god-not-accepted>
            </v-overlay>

            <v-container fluid>
                <router-view />
            </v-container>
        </v-content>

        <god-footer></god-footer>
    </v-app>
</template>

<script>

import { mapState } from 'vuex';
import Footer from '@/components/Footer.vue';
import Drawer from '@/components/Drawer.vue';
import ProfileNotAccepted from '@/components/ProfileNotAccepted';

export default {
    components: {
        'god-not-accepted': ProfileNotAccepted,
        'god-footer': Footer,
        'god-drawer': Drawer
    },
    computed: mapState(['organizationId', 'status']),
    data: () => ({
        isDrawerMini: true
    }),
    created() {
        this.$vuetify.theme.dark = true;
    }
};
</script>

<style lang="scss">
html,
body {
    overflow-y: auto !important;
}

.v-navigation-drawer {
    height: calc(100vh - 96px) !important;
}

.v-content {
    padding: 64px 0px 50px 56px;
}

.v-overlay {
    height: calc(100vh - 96px);
}
</style>
