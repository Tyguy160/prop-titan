<template>
  <v-app>
    <!-- <v-navigation-drawer app>

    </v-navigation-drawer> -->
    <Nav></Nav>

    <v-main>
      <v-container fluid>
        <div class="py-2" v-for="(property, i) in properties" :key="i">
          <property :property="property"></property>
        </div>
      </v-container>
    </v-main>
    <new-property-form @newProperty="addNewProperty"></new-property-form>
    <v-footer>Copyright 2021</v-footer>
  </v-app>
</template>

<script>
import Property from "./components/Property/Property.vue";
import Nav from "./components/Header/Nav";
import NewPropertyForm from "./components/NewPropertyForm.vue";

export default {
  name: "App",

  components: {
    Property,
    Nav,
    NewPropertyForm,
  },

  data: () => ({
    properties: [],
  }),
  methods: {
    addNewProperty(property) {
      this.properties.push(JSON.parse(JSON.stringify(property)));
      console.log("Got a new property");
    },
  },
};
</script>
