<template>
  <div v-if="VueCookies.isKey('access_token')">
    <HomeNavBar />
    <div>
      <component :is="inscopeComponent"></component>
    </div>
  </div>
  <div v-else>
    <img alt="Vue logo" src="../assets/philipp.jpg" />
    <h1>Nicht angemeldet!</h1>
    <h2>Willkommen auf der Startseite der HtW Saar Coding Plattform</h2>
  </div>
</template>

<script>
import HomeNavBar from "./HomeNavBar";
import { useState } from "../store/store";
import VueCookies from "vue-cookies";

import {
  ref,
  onMounted,
  defineAsyncComponent,
  watch,
  markRaw,
  shallowRef,
} from "vue";
import { getBackendRequest } from "../helper/requests";
import User from "../models/User";
export default {
  name: "home",
  components: {
    HomeNavBar,
  },
  setup() {
    const DEVMODE = process.env.NODE_ENV === "development";
    // const DEVMODE = false
    let state = useState();

    const inscopeComponent = ref(
      defineAsyncComponent(() => import("@/" + state.component))
    );

    // onMounted(loadPluginLocation());

    watch(
      () => state.component,
      (component) => {
        inscopeComponent.value = defineAsyncComponent(() =>
          import("@/" + state.component)
        );
      }
    );

    function loadPluginLocation() {
      try {
        const URL_PARAMS = new URLSearchParams(window.location.search);

        const COMPONENT_PATH =
          "components/" + URL_PARAMS.get("component") + ".vue";
        //const PLUGIN_PATH = "components/" + URL_PARAMS.get("plugin") + ".vue";

        state.component = COMPONENT_PATH;
        //state.plugin = PLUGIN_PATH;
      } catch (e) {
        // Geht eines nicht, wird nichts gesetzt
        console.log(e);
      }
    }

    return {
      state,
      inscopeComponent,
      DEVMODE,
      VueCookies,
    };
  },
};
</script>
