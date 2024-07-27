<template>
  <div class="banner">
    <div class="parent pt-1">
      <img src="@/assets/images/banner-bg.jpg" alt="" />
      <div class="cont">
        <h3>
          <span>Huge Saving</span> on <br />
          UHD Televisions
        </h3>
        <p class="hint">Sale up to 70% off on selected items*</p>
        <v-btn
          variant="outlined"
          class="py-2 px-10"
          denisity="combact"
          style="border-radius: 30px; text-transform: none"
          height="50"
          weight="160"
          >Shop Now</v-btn
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.banner {
  .parent {
    height: 380px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .cont {
      color: white;
      padding: 40px 0 0 100px;
      position: absolute;
      left: 40px;
      top: 40px;
      width: 600px;
      h3 {
        font-size: 45px;
        font-weight: 900;
        span {
          color: rgb(10, 169, 147);
        }
      }
    }
    .hint {
      margin: 20px 0 40px;
    }
  }
}

// media queries
@media (max-width: 990px) {
  .banner {
    .parent {
      .cont {
        h3 {
          font-size: 35px;
        }
        width: 500px;
        left: 0;
      }
    }
  }
}

// media queries
@media (max-width: 767px) {
  .banner {
    .parent {
      height: 320px;
      .cont {
        padding-left: 20px;
        h3 {
          font-size: 30px;
        }
        width: 500px;
        left: 0;
        .hint {
          font-size: 14px;
        }
      }
    }
  }
}
// media queries
@media (max-width: 580px) {
  .banner {
    .parent {
      height: 250px;
      .cont {
        padding-left: 20px;
        padding-top: 20px;
        h3 {
          font-size: 24px;
        }
        width: 80%;
        left: 0;
        .hint {
          font-size: 12px;
        }
        button {
          height: 30px !important;
          font-size: 11px !important;
          width: 10px !important;
        }
      }
    }
  }
}
</style>
