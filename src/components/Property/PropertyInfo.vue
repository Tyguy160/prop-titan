<template>
  <!-- Property Info -->
  <!-- Beds, baths, square feet, units, house type -->
  <v-container class="">
    <v-row>
      <v-col cols="3">
        <v-text-field
          v-model="information.bedrooms"
          type="number"
          hide-details="auto"
          label="Bedrooms"
          min="0"
          disabled
          >Price</v-text-field
        >
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="information.bathrooms"
          type="number"
          hide-details="auto"
          label="Bathrooms"
          min="0"
          disabled
          >Price</v-text-field
        >
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="information.squareFootage"
          type="number"
          hide-details="auto"
          label="Square footage"
          min="0"
          suffix="sq. ft."
          disabled
          >Price</v-text-field
        >
      </v-col>
    </v-row>
    <v-row> </v-row>
    <v-row>
      <v-col cols="6">
        <v-autocomplete
          :items="propertyTypes"
          label="Property Type"
          v-model="information.type"
          disabled
        ></v-autocomplete>
      </v-col>
      <v-col v-if="information.units" cols="3">
        <v-text-field
          v-model="information.units"
          type="number"
          hide-details="auto"
          label="Units"
          min="1"
          >Units</v-text-field
        >
      </v-col>
    </v-row>
    <v-row>
      <v-textarea
        outlined
        auto-grow
        no-resize
        name="Notes"
        v-model="information.notes"
        label="Notes"
      ></v-textarea>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PropertyInfo",
  props: {
    information: Object,
  },
  data: () => ({
    propertyTypes: [
      "Single-family home",
      "Multi-family home",
      "Apartment complex",
      "Condominium",
    ],
    squareFootage: "",
    bathrooms: "",
    bedrooms: "",
    units: 1,
  }),

  computed: {},
};
</script>
