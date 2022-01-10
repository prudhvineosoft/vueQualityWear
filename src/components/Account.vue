<template>
  <div class="container">
    <h1 class="text-center">Account</h1>
    <div class="row">
      <div class="col-sm-5">
        <div class="row">
          <div class="col-sm-6"><h4>Name</h4></div>
          <div class="col-sm-6"><h4>...</h4></div>
          <div class="col-sm-6"><h4>Email</h4></div>
          <div class="col-sm-6"><h4>...</h4></div>
          <div class="col-sm-6"><h4>User ID</h4></div>
          <div class="col-sm-6"><h4>....</h4></div>
        </div>
      </div>
      <div class="col-sm-5">
        <div class="row">
          <div class="col-sm-12">....</div>
          <!-- <button type="submit" class="btn btn-default update">
            Add Address
          </button> -->
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target=".bs-example-modal-md"
          >
            Large modal
          </button>

          <div
            class="modal fade bs-example-modal-md"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
          >
            <div class="modal-dialog modal-md" role="document">
              <div class="modal-content">
                <form @submit.prevent="postSignup">
                  <div class="form-group">
                    <label for="street">Street</label>
                    <input
                      type="text"
                      class="form-control"
                      name="street"
                      placeholder="Name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="street">Street</label>
                    <input
                      type="text"
                      class="form-control"
                      name="street"
                      placeholder="Name"
                    />
                  </div>
                  <h5>
                    Already You have Account
                    <span
                      ><router-link to="/login">Click Hear</router-link></span
                    >
                  </h5>
                  <button type="submit" class="btn btn-warning">Signup</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Account",
};
</script>

<style>
</style>