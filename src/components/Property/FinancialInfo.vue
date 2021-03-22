<template>
  <v-container class="px-0 py-0">
    <div>
      <v-container class="px-0">
        <v-row>
          <v-col cols="5">
            <v-text-field
              v-model="loan.salePrice"
              type="number"
              hide-details="auto"
              label="Price"
              prefix="$"
              min="0"
              >Price</v-text-field
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="loan.downPayment"
              type="number"
              hide-details="auto"
              v-bind:max="price"
              v-bind:disabled="!downPaymentSwitch"
              prefix="$"
              label="Down payment"
              min="0"
              >Down payment</v-text-field
            >
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="downPaymentPercent"
              hide-details="auto"
              type="number"
              max="100"
              min="0"
              v-bind:disabled="downPaymentSwitch"
              suffix="%"
              >Down payment %</v-text-field
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-autocomplete
              label="Mortgage length"
              v-model="loan.mortgageLength"
              :items="mortgageLengths"
              suffix="years"
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="loan.mortgageRate"
              hide-details="auto"
              suffix="%"
              label="Mortgage rate"
              min="0"
              max="100"
              type="number"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-text-field
              v-model="mortgageAmount"
              type="number"
              disabled
              hide-details="auto"
              prefix="$"
              label="Total mortgage amount"
            />
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="principleAndInterest"
              hide-details="auto"
              prefix="$"
              suffix="per month"
              label="Principle and interest"
              disabled
            />
          </v-col>
        </v-row>

        <v-row> </v-row>
      </v-container>
    </div>

    <!-- <select placeholder="Mortgage type">
      <option>Mortgage type</option>
      <option>Conventional</option>
      <option>FHA</option>
    </select> -->
    <!-- <select>
      <option>Property type</option>
      <option>Single-family home</option>
      <option>Multi-family home</option>
    </select>
    <input placeholder="Gross income" />
    <input placeholder="Current rent" /> -->
  </v-container>
  <!--
    Price - Input (Decimal)
    Down payment - Input (Decimal)
    Mortgage type - Input (String)
    Property type - Input (String)
    Gross income - Input (Decimal)
    Current rent - Input (Decimal)
    Current rent same as market rent? - Input (Bool)
    Market rent - Input (Decimal)
    Semiannual taxes - Input (Decimal)
    Utilities
        Water - Input (Decimal); Tenant paid - Input (Bool)
        Waste - Input (Decimal); Tenant paid - Input (Bool)
        Sewer - Input (Decimal); Tenant paid - Input (Bool)
        Electricity - Input (Decimal); Tenant paid - Input (Bool)
        Gas - Input (Decimal); Tenant paid - Input (Bool)
    Mortgage length
    Annual repairs - Input (Decimal)
    Loan amount - Input (Decimal)
        PMI - Input (Decimal)
        Principle and interest - Input (Decimal)
    Homeowners' insurance - Input (Decimal)
    Lending rate - Input (Decimal)


    Net Operating Income
    Capitalization Rate
    Internal Rate of Return (IRR)
    Cash Flow
    Cash on Cash Return
    GRM
    LTV Ratio
    Debt Service Coverage Ratio
    Operating Expense Ratio
    Occupancy Rate
     -->
</template>

<script>
export default {
  name: "PropertInfo",
  props: {
    loan: Object,
  },
  data: () => ({
    price: "",
    downPaymentSwitch: true,
    // defaultDownPaymentPercent: "0.2",
    mortgageLengths: [15, 30],
  }),
  computed: {
    mortgageAmount() {
      if (!(this.loan.salePrice && this.loan.downPayment)) {
        return "";
      }
      if (this.loan.salePrice - this.loan.downPayment < 0) {
        return "";
      }
      return this.loan.salePrice - this.loan.downPayment;
    },

    downPaymentPercent: {
      get() {
        let percent = (this.loan.downPayment / this.loan.salePrice) * 100;
        if (
          parseInt(this.loan.salePrice) <= 0 ||
          parseInt(this.loan.downPayment) < 0 ||
          parseInt(this.loan.salePrice) < parseInt(this.loan.downPayment)
        ) {
          return "";
        } else if (!Number.isNaN(percent) && Number.isFinite(percent)) {
          return percent;
        } else {
          return "";
        }
      },
    },
    principleAndInterest() {
      // P = (Pv*R) / [1 - (1 + R)^(-n)]
      let Pv = this.mortgageAmount;
      let R = this.loan.mortgageRate / 100 / 12;
      let n = parseInt(this.loan.mortgageLength) * 12;
      let P = (Pv * R) / (1 - Math.pow(1 + R, -n));

      if (Number.isNaN(P)) {
        return "";
      } else {
        return Number.parseFloat(P).toFixed(2);
      }
    },
  },
};
</script>