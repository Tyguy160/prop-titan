<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-icon class="pr-3">mdi-home-group</v-icon>
      <h1 class="">Prop Titan</h1>
    </div>

    <v-spacer></v-spacer>
    <v-btn href="" color="secondary" class="mx-2">
      <span class="m-2 px-2">Sign Up</span>
    </v-btn>
    <v-btn href="" color="secondary" class="mx-2">
      <span class="m-2">Pricing</span>
    </v-btn>
    <v-btn href="" color="secondary" class="mx-2">
      <span class="m-2">About</span>
    </v-btn>
    <v-btn href="" color="secondary" class="ml-2">
      <span class="m-2">Sign In</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style>
</style>