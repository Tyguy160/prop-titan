<template>
  <v-card class="px-0 py-4" elevation="2">
    <h3 class="px-4">
      {{
        property.location.nickname
          ? `${property.location.nickname} –`
          : `${property.location.address1},`
      }}

      {{ property.location.nickname ? property.location.address1 : ""
      }}{{ property.location.address2 }}

      {{ property.location.city }}, {{ property.location.state }}
      {{ property.location.zipCode }}
    </h3>
    <v-tabs
      centered
      fixed-tabs
      background-color="light-grey"
      slider-color="light-grey"
      header-color="white"
      color="light-grey"
      v-model="currentTab"
    >
      <v-tab> Info</v-tab>
      <!-- <v-tab> Details </v-tab> -->
      <v-tab> Loan </v-tab>
      <v-tab> Investment </v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab" class="pt-4">
      <v-tab-item>
        <property-info :information="property.information"></property-info>
      </v-tab-item>
      <!-- <v-tab-item>
        <property-info></property-info>
      </v-tab-item> -->
      <v-tab-item>
        <financial-info :loan="property.loan"></financial-info>
      </v-tab-item>
      <v-tab-item>
        <property-info></property-info>
      </v-tab-item>
    </v-tabs-items>

    <!-- Purchase and Loan -->
    <!-- Rental information -->
    <!-- Monthly Financials -->
    <!-- General Financials -->
    <!-- Price per square foot, gross income -->
  </v-card>
</template>

<script>
import PropertyInfo from "./PropertyInfo";
import FinancialInfo from "./FinancialInfo";
export default {
  name: "Property",
  props: {
    property: Object,
  },
  data: () => ({
    currentTab: null,
  }),
  components: {
    PropertyInfo,
    FinancialInfo,
  },
  computed: {
    pricePerSquareFoot() {
      return 0;
    },
  },
};
</script>
