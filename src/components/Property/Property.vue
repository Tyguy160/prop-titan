<template>
  <v-card class="px-8 py-8" elevation="2" max-width="500px">
    <div class="d-flex flex-row pb-4">
      <div
        style="background-color: lightgrey; min-height: 100px; min-width: 100px"
      ></div>
      <div class="px-4 d-flex flex-column">
        <h3>
          {{
            property.location.nickname
              ? `${property.location.nickname}`
              : `${property.location.address1}`
          }}
        </h3>
        <div>
          {{ property.location.nickname ? property.location.address1 : "" }}
        </div>
        <div>
          {{ property.location.address2 }}
        </div>
        <div>
          {{ property.location.city }}, {{ property.location.state }}
          {{ property.location.zipCode }}
        </div>
      </div>
    </div>
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
