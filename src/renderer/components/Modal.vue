<template>
    <div class="modal-wrapper">
        <div class="modal-container flex-column">
            <h1 class="display-1 white--text text-uppercase mb-8"> {{ headline }} </h1> 
            <v-btn class="tile" :to="route"> {{ button }} </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        headline: String,
        button: String,
        route: String
    }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/main.scss';

.modal-wrapper {
    @include flex-center;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    position: absolute;
    z-index: 99;
}

.modal-container {
    @include flex-center;
    width: 600px;
    height: 300px;
    background: $blue;
    border: 3px solid $white;
    outline: 5px solid $blue;
}
</style>