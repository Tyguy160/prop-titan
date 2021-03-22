<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="900px"
      @click:outside="resetPropertyForm"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          color="primary"
          style="right: 25px; bottom: 25px"
          fixed
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-stepper v-model="propertyStepper">
        <v-stepper-header>
          <v-stepper-step :complete="propertyStepper > 1" step="1">
            Property Location
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="propertyStepper > 2" step="2">
            Property Information
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="propertyStepper > 3" step="3">
            Loan Information
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4"> Rental Information </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card>
              <v-form
                ref="locationForm"
                v-model="locationFormValid"
                @submit.prevent="submit"
              >
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Property nickname"
                          v-model="property.location.nickname"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Address 1"
                          :rules="requiredRule"
                          required
                          v-model="property.location.address1"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Address 2"
                          v-model="property.location.address2"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="City"
                          :rules="requiredRule"
                          required
                          v-model="property.location.city"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-autocomplete
                          label="State"
                          :rules="requiredRule"
                          required
                          :items="states"
                          v-model="property.location.state"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Zip code"
                          :rules="requiredRule"
                          required
                          v-model="property.location.zipCode"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="resetPropertyForm"> Cancel </v-btn>
                  <v-btn
                    color="primary"
                    :disabled="!locationFormValid"
                    @click="propertyStepper++"
                  >
                    Continue
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card>
              <v-form
                ref="informationForm"
                v-model="informationFormValid"
                @submit.prevent="submit"
              >
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Bedrooms"
                          v-model="property.information.bedrooms"
                          type="number"
                          hide-details="auto"
                          min="0"
                          required
                          :rules="requiredRule"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Bathrooms"
                          type="number"
                          hide-details="auto"
                          min="0"
                          required
                          :rules="requiredRule"
                          v-model="property.information.bathrooms"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="property.information.squareFootage"
                          type="number"
                          hide-details="auto"
                          label="Square footage"
                          min="0"
                          required
                          :rules="requiredRule"
                          suffix="sq. ft."
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <v-autocomplete
                          :items="propertyTypes"
                          label="Property Type"
                          :rules="requiredRule"
                          required
                          v-model="property.information.type"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="4" v-if="isMultiUnit">
                        <v-text-field
                          v-model="property.information.units"
                          type="number"
                          hide-details="auto"
                          label="Units"
                          min="1"
                          required
                          :rules="requiredRule"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="resetPropertyForm"> Cancel </v-btn>
                  <v-btn text @click="propertyStepper--"> Back </v-btn>

                  <v-btn
                    color="primary"
                    :disabled="!informationFormValid"
                    @click="propertyStepper++"
                  >
                    Continue
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card>
              <v-form
                ref="loanForm"
                v-model="loanFormValid"
                @submit.prevent="submit"
              >
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Sale price"
                          v-model="property.loan.salePrice"
                          type="number"
                          hide-details="auto"
                          min="0"
                          required
                          :rules="requiredRule"
                          prefix="$"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Down payment"
                          v-model="property.loan.downPayment"
                          type="number"
                          hide-details="auto"
                          min="0"
                          required
                          :rules="requiredRule"
                          v-bind:max="property.loan.salePrice"
                          prefix="$"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Down payment percent"
                          v-model="downPaymentPercent"
                          type="number"
                          hide-details="auto"
                          min="0"
                          max="100"
                          required
                          disabled
                          :rules="requiredRule"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-autocomplete
                          label="Mortgage length"
                          :items="mortgageLengths"
                          suffix="years"
                          v-model="property.loan.mortgageLength"
                          required
                          :rules="requiredRule"
                        >
                        </v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Mortgage rate"
                          v-model="property.loan.mortgageRate"
                          type="number"
                          hide-details="auto"
                          min="0"
                          max="100"
                          required
                          :rules="requiredRule"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="resetPropertyForm"> Cancel </v-btn>
                  <v-btn text @click="propertyStepper--"> Back </v-btn>
                  <v-btn
                    color="primary"
                    @click.enter="propertyStepper++"
                    :disabled="!loanFormValid"
                  >
                    Continue
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-card>
              <v-form
                ref="rentalForm"
                v-model="rentalFormValid"
                @submit.prevent="submit"
              >
                <v-card-text>
                  <v-container v-if="property.information.units">
                    <v-row>
                      <v-col
                        v-for="(unit, index) in parseInt(
                          property.information.units
                        )"
                        :key="unit"
                        class="px-4 py-4"
                        cols="3"
                      >
                        <v-card class="px-4 py-4">
                          <!-- <v-col cols="3"> -->
                          <h3>Unit {{ unit }}</h3>
                          <!-- <v-row> -->
                          <v-text-field
                            v-model="property.rental.units[index].rent"
                            type="number"
                            label="Rent"
                            hide-details="auto"
                            min="0"
                            required
                            :rules="requiredRule"
                            prefix="$"
                          >
                            Rent
                          </v-text-field>
                          <v-switch
                            v-model="property.rental.units[index].rented"
                            label="Currently rented"
                          ></v-switch>
                          <!-- </v-row> -->
                          <!-- </v-col> -->
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-row> </v-row>
                  </v-container>
                  <v-container v-else>
                    <v-text-field
                      v-model="property.rental.totalRent"
                      type="number"
                      :label="`Monthly rent`"
                      hide-details="auto"
                      min="0"
                      required
                      :rules="requiredRule"
                      prefix="$"
                    >
                      Rent
                    </v-text-field>
                    <v-switch
                      v-model="property.rental.fullyRented"
                      label="Currently rented"
                    ></v-switch>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="resetPropertyForm"> Cancel </v-btn>
                  <v-btn text @click="propertyStepper--"> Back </v-btn>
                  <v-btn
                    color="primary"
                    @click="submit"
                    :disabled="!rentalFormValid"
                  >
                    Add Property
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "NewPropertyForm",
  data: () => ({
    dialog: true,
    locationFormValid: true,
    informationFormValid: true,
    loanFormValid: true,
    rentalFormValid: true,
    propertyStepper: 1,
    propertyTypes: [
      "Single-family home",
      "Multi-family home",
      "Apartment complex",
      "Condominium",
    ],
    property: {
      location: {
        nickname: "Home",
        address1: "144 Sweet Alyssum Dr.",
        address2: "",
        city: "Ladson",
        state: "South Carolina",
        zipCode: "29456",
      },
      information: {
        bedrooms: "4",
        bathrooms: "2.5",
        squareFootage: "2200",
        type: "Multi-family home",
        units: null,
      },
      loan: {
        downPayment: "10000",
        salePrice: "295000",
        mortgageRate: "2.5",
        mortgageLength: 15,
        mortgageType: "FHA",
      },
      rental: {
        units: [],
        totalRent: null,
        fullyRented: false,
      },
    },
    states: [
      "Alaska",
      "Alabama",
      "Arkansas",
      "American Samoa",
      "Arizona",
      "California",
      "Colorado",
      "Connecticut",
      "District of Columbia",
      "Delaware",
      "Florida",
      "Georgia",
      "Guam",
      "Hawaii",
      "Iowa",
      "Idaho",
      "Illinois",
      "Indiana",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Massachusetts",
      "Maryland",
      "Maine",
      "Michigan",
      "Minnesota",
      "Missouri",
      "Mississippi",
      "Montana",
      "North Carolina",
      "North Dakota",
      "Nebraska",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "Nevada",
      "New York",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Puerto Rico",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Virginia",
      "Virgin Islands",
      "Vermont",
      "Washington",
      "Wisconsin",
      "West Virginia",
      "Wyoming",
    ],
    mortgageLengths: [15, 30],
    requiredRule: [(v) => !!v || "This field is required"],
  }),
  methods: {
    validateLocationForm() {
      this.$refs.locationForm.validate();
    },
    validateInformationForm() {
      this.$refs.informationForm.validate();
    },
    submit() {
      this.$emit("newProperty", this.property);
      this.resetPropertyForm();
    },
    resetPropertyForm() {
      this.$refs.locationForm.reset();
      this.$refs.informationForm.reset();
      this.propertyStepper = 1;
      this.dialog = false;
    },
  },
  computed: {
    mortgageAmount() {
      if (!(this.property.loan.salePrice && this.property.loan.downPayment)) {
        return "";
      }
      if (this.property.loan.salePrice - this.property.loan.downPayment < 0) {
        return "";
      }
      return this.property.loan.salePrice - this.property.loan.downPayment;
    },
    isMultiUnit() {
      return (
        this.property.information.type === "Multi-family home" ||
        this.property.information.type === "Apartment complex"
      );
    },

    downPaymentPercent: {
      get() {
        let percent =
          (this.property.loan.downPayment / this.property.loan.salePrice) * 100;
        if (
          parseInt(this.property.loan.salePrice) <= 0 ||
          parseInt(this.property.loan.downPayment) < 0 ||
          parseInt(this.property.loan.salePrice) <
            parseInt(this.property.loan.downPayment)
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
      let R = this.property.loan.mortgageRate / 100 / 12;
      let n = parseInt(this.property.loan.mortgageLength) * 12;
      let P = (Pv * R) / (1 - Math.pow(1 + R, -n));

      if (Number.isNaN(P)) {
        return "";
      } else {
        return Number.parseFloat(P).toFixed(2);
      }
    },
    units() {
      return this.property.information.units;
    },
  },

  watch: {
    /*   
    TODO There's a nasty corner case where if we pre-fill the units,
    TODO then we end up not filling up the array with each rental unit object
    */
    units(newUnits, oldUnits) {
      // If the user sets the number of units to be null
      // wipe out the rental unit array
      if (newUnits === null) {
        this.property.rental.units = [];
      }
      // If the user increased the number of units,
      // add the delta to the rental unit array
      else if (newUnits > oldUnits) {
        let delta = newUnits - oldUnits;
        for (let i = 0; i < delta; i++) {
          console.log("Added a unit to the array");
          this.property.rental.units.push({
            rent: null,
            rented: false,
          });
        }
      } else if (newUnits < oldUnits) {
        let delta = oldUnits - newUnits;
        for (let i = 0; i < delta; i++) {
          console.log("Removed a unit from the array");
          this.property.rental.units.pop();
        }
      }
    },
  },
};
</script>

<style></style>