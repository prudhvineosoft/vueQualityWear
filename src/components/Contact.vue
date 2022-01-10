<template>
  <div id="contact-page" class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-center">Contact <strong>Us</strong></h2>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-8">
          <div class="contact-form">
            <h2 class="title text-center">Get In Touch</h2>
            <div class="status alert alert-success" style="display: none"></div>
            <form @submit.prevent="contact">
              <div class="form-group col-md-6">
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  placeholder="Name"
                  v-model="state.name"
                />
                <label class="text-danger" v-if="v$.name.$error">
                  {{ v$.name.$errors[0].$message }}
                </label>
              </div>
              <div class="form-group col-md-6">
                <input
                  type="phone"
                  name="number"
                  class="form-control"
                  placeholder="phone"
                  v-model="state.phone"
                />
                <label class="text-danger" v-if="v$.phone.$error">
                  {{ v$.phone.$errors[0].$message }}
                </label>
              </div>
              <input type="hidden" naem="email" value="" />
              <div class="form-group col-md-12">
                <textarea
                  name="message"
                  id="message"
                  class="form-control"
                  rows="2"
                  placeholder="Your Message Here"
                  v-model="state.message"
                ></textarea>
                <label class="text-danger" v-if="v$.message.$error">
                  {{ v$.message.$errors[0].$message }}
                </label>
              </div>
              <div class="form-group col-md-12">
                <button type="submit" class="btn btn-primary pull-right">
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="contact-info">
            <h2 class="title text-center">Contact Info</h2>
            <address>
              <p>E-Shopper Inc.</p>
              <p>935 W. Webster Ave New Streets Chicago, IL 60614, NY</p>
              <p>Newyork USA</p>
              <p>Mobile: +2346 17 38 93</p>
              <p>Fax: 1-714-252-0026</p>
              <p>Email: info@e-shopper.com</p>
            </address>
            <div class="social-networks">
              <h2 class="title text-center">Social Networking</h2>
              <ul>
                <li>
                  <a href="#"><i class="fa fa-facebook"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-google-plus"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-youtube"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--/#contact-page-->
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, minLength, numeric } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { postContact } from "@/common/Service";
export default {
  name: "Contact",
  setup() {
    const state = reactive({
      name: null,
      message: null,
      phone: null,
      email: null,
    });
    const rules = computed(() => {
      return {
        name: { required },
        message: { required },
        phone: { required, numeric, minLength: minLength(10) },
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  methods: {
    contact() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let contactData = this.state;
        console.log(contactData);
        postContact(contactData)
          .then((res) => {
            if (res.data.err == 0) {
              this.$toast.success("We Will Call You Soon");
            } else {
              this.$toast.error("somethin went wrong");
            }
          })
          .catch((err) => {
            console.log("SOmething Wrong " + err);
          });
      }
    },
  },
};
</script>

<style>
</style>