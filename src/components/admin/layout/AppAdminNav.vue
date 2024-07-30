<template>
  <div class="admin-nav-bar">
    <v-app-bar color="#F5EDED" class="pt-3">
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <img
              src="@/assets/images/logo.png"
              @click="$router.push({ name: 'admin' })"
              style="cursor: pointer"
              alt=""
            />
          </v-col>
          <v-col cols="3">
            <div class="search-parent position-relative" style="width: 90%">
              <input
                type="text"
                name="navSearch"
                id="navSearch"
                class="pt-1"
                style="width: 100%; border-radius: 20px; outline: none"
                placeholder="Search..."
              />
              <svg
                data-icon="search"
                viewBox="0 0 512 512"
                width="20"
                style="
                  position: absolute;
                  top: 15px;
                  left: -25px;
                  transform: translateY(-50%);
                  color: black;
                "
              >
                <path
                  d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5   S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z"
                ></path>
              </svg>
            </div>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="5" class="d-flex justify-end" style="gap: 35px">
            <div
              class="lang help d-flex align-center text-white"
              id="language-btn"
              style="gap: 5px; cursor: pointer"
            >
              <span v-html="selectedLang[0].icons"></span>
              <v-menu activator="#language-btn">
                <v-list v-model:selected="selectedLang" mandatory>
                  <v-list-item v-for="lang in langs" :key="lang.lang" :value="lang">
                    <v-list-item-title class="d-flex align-center" style="gap: 10px">
                      <span v-html="lang.icons"></span>{{ lang.lang }} /
                      {{ lang.currency }}</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div
              class="profile d-flex align-center"
              id="profile"
              style="gap: 5px; cursor: pointer"
            >
              <span>Phan Quoc Khanh</span>
              <v-menu activator="#profile">
                <v-list>
                  <v-list-item>
                    <v-list-item-title class="d-flex align-center" style="gap: 10px">
                      <span>Profile</span></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>


<script>
export default {
  data: () => ({
    langs: [
      {
        icons: `<svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style="enable-background: new 0 0 512 512"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xml:space="preserve"
                        width="20px"

                      >
                        <circle
                          style="fill: #f0f0f0"
                          cx="256"
                          cy="256"
                          r="256"
                        ></circle>
                        <g>
                          <path
                            style="fill: #0052b4"
                            d="M52.92,100.142c-20.109,26.163-35.272,56.318-44.101,89.077h133.178L52.92,100.142z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M503.181,189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075,89.076H503.181z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M8.819,322.784c8.83,32.758,23.993,62.913,44.101,89.075l89.074-89.075L8.819,322.784L8.819,322.784   z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M411.858,52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177L411.858,52.921z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M100.142,459.079c26.163,20.109,56.318,35.272,89.076,44.102V370.005L100.142,459.079z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M189.217,8.819c-32.758,8.83-62.913,23.993-89.075,44.101l89.075,89.075V8.819z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M322.783,503.181c32.758-8.83,62.913-23.993,89.075-44.101l-89.075-89.075V503.181z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M370.005,322.784l89.075,89.076c20.108-26.162,35.272-56.318,44.101-89.076H370.005z"
                          ></path>
                        </g>
                        <g>
                          <path
                            style="fill: #d80027"
                            d="M509.833,222.609h-220.44h-0.001V2.167C278.461,0.744,267.317,0,256,0   c-11.319,0-22.461,0.744-33.391,2.167v220.44v0.001H2.167C0.744,233.539,0,244.683,0,256c0,11.319,0.744,22.461,2.167,33.391   h220.44h0.001v220.442C233.539,511.256,244.681,512,256,512c11.317,0,22.461-0.743,33.391-2.167v-220.44v-0.001h220.442   C511.256,278.461,512,267.319,512,256C512,244.683,511.256,233.539,509.833,222.609z"
                          ></path>
                          <path
                            style="fill: #d80027"
                            d="M322.783,322.784L322.783,322.784L437.019,437.02c5.254-5.252,10.266-10.743,15.048-16.435   l-97.802-97.802h-31.482V322.784z"
                          ></path>
                          <path
                            style="fill: #d80027"
                            d="M189.217,322.784h-0.002L74.98,437.019c5.252,5.254,10.743,10.266,16.435,15.048l97.802-97.804   V322.784z"
                          ></path>
                          <path
                            style="fill: #d80027"
                            d="M189.217,189.219v-0.002L74.981,74.98c-5.254,5.252-10.266,10.743-15.048,16.435l97.803,97.803   H189.217z"
                          ></path>
                          <path
                            style="fill: #d80027"
                            d="M322.783,189.219L322.783,189.219L437.02,74.981c-5.252-5.254-10.743-10.266-16.435-15.047   l-97.802,97.803V189.219z"
                          ></path>
                        </g>
                      </svg>`,
        lang: "EN",
        currency: "USD",
      },
      {
        icons: ` <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style="enable-background: new 0 0 512 512"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xml:space="preserve"
                        width="20px"
                      >
                        <path
                          style="fill: #ffda44"
                          d="M15.923,345.043C52.094,442.527,145.929,512,256,512s203.906-69.473,240.077-166.957L256,322.783  L15.923,345.043z"
                        ></path>
                        <path
                          d="M256,0C145.929,0,52.094,69.472,15.923,166.957L256,189.217l240.077-22.261C459.906,69.472,366.071,0,256,0z"
                        ></path>
                        <path
                          style="fill: #d80027"
                          d="M15.923,166.957C5.633,194.69,0,224.686,0,256s5.633,61.31,15.923,89.043h480.155  C506.368,317.31,512,287.314,512,256s-5.632-61.31-15.923-89.043H15.923z"
                        ></path>
                      </svg>`,
        lang: "DE",
        currency: "EUR",
      },
    ],
    selectedLang: [
      {
        icons: `<svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style="enable-background: new 0 0 512 512"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xml:space="preserve"
                        width="20px"

                      >
                        <circle
                          style="fill: #f0f0f0"
                          cx="256"
                          cy="256"
                          r="256"
                        ></circle>
                        <g>
                          <path
                            style="fill: #0052b4"
                            d="M52.92,100.142c-20.109,26.163-35.272,56.318-44.101,89.077h133.178L52.92,100.142z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M503.181,189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075,89.076H503.181z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M8.819,322.784c8.83,32.758,23.993,62.913,44.101,89.075l89.074-89.075L8.819,322.784L8.819,322.784   z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M411.858,52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177L411.858,52.921z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M100.142,459.079c26.163,20.109,56.318,35.272,89.076,44.102V370.005L100.142,459.079z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M189.217,8.819c-32.758,8.83-62.913,23.993-89.075,44.101l89.075,89.075V8.819z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M322.783,503.181c32.758-8.83,62.913-23.993,89.075-44.101l-89.075-89.075V503.181z"
                          ></path>
                          <path
                            style="fill: #0052b4"
                            d="M370.005,322.784l89.075,89.076c20.108-26.162,35.272-56.318,44.101-89.076H370.005z"
                          ></path>
                        </g>
                        <g>
                          <path
                            style="fill: #d80027"
                            d="M509.833,222.609h-220.44h-0.001V2.167C278.461,0.744,267.317,0,256,0   c-11.319,0-22.461,0.744-33.391,2.167v220.44v0.001H2.167C0.744,233.539,0,244.683,0,256c0,11.319,0.744,22.461,2.167,33.391   h220.44h0.001v220.442C233.539,511.256,244.681,512,256,512c11.317,0,22.461-0.743,33.391-2.167v-220.44v-0.001h220.442   C511.256,278.461,512,267.319,512,256C512,244.683,511.256,233.539,509.833,222.609z"
                          ></path>
                          <path
                            style="fill: #d80027"
                            d="M322.783,322.784L322.783,322.784L437.019,437.02c5.254-5.252,10.266-10.743,15.048-16.435   l-97.802-97.802h-31.482V322.784z"
                          ></path>
                          <path
                            style="fill: #d80027"
                            d="M189.217,322.784h-0.002L74.98,437.019c5.252,5.254,10.743,10.266,16.435,15.048l97.802-97.804   V322.784z"
                          ></path>
                          <path
                            style="fill: #d80027"
                            d="M189.217,189.219v-0.002L74.981,74.98c-5.254,5.252-10.266,10.743-15.048,16.435l97.803,97.803   H189.217z"
                          ></path>
                          <path
                            style="fill: #d80027"
                            d="M322.783,189.219L322.783,189.219L437.02,74.981c-5.252-5.254-10.743-10.266-16.435-15.047   l-97.802,97.803V189.219z"
                          ></path>
                        </g>
                      </svg>`,
        lang: "EN",
        currency: "USD",
      },
    ],
  }),
};
</script>
