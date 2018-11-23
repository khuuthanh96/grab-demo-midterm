<template>
    <div id="mynavbar">
        <b-navbar toggleable="md" type="dark">
            <!-- <b-navbar-toggle target="nav_collapse"></b-navbar-toggle> -->

            <b-navbar-brand href="#">App2</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown right>
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                    <em>{{ user ? user.name : '' }}</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#" @click="logout">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "myNavbar",
    props: {
        user: Object
    },
    methods: {
        logout() {
            delete localStorage.accessToken;
            delete localStorage.refreshToken;
            this.$emit('logout', null);
        }
    }
}
</script>

<style scoped>
#mynavbar {
    padding-bottom: 20px;
}
</style>
