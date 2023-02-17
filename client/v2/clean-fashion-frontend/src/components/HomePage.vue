<template>
  <h1>Clear Fashion</h1>
  <div class="clear-fashion">
    <div class="show">
      <p>Show:</p>
      <select v-model="size">
        <option>0</option>
        <option>12</option>
        <option>24</option>
        <option>48</option>
      </select>
    </div>

    <div class="filters">
      <p>Page:</p>
      <select v-model="currentPage">
        <option v-for="currentPage in maxPage" v-bind:key="currentPage">
          {{ currentPage }}
        </option>
      </select>

      <button type="button" v-on:click="sortDate(products)">
        By release date
      </button>
      <button type="button" v-on:click="sortPrice(products)">By price</button>

      <p>By brand:</p>
      <select v-model="brandSelect">
        <option disabled value="">Choose a brand</option>
        <option>All products</option>
        <option v-for="brands in brands" v-bind:key="brands.name">
          {{ brands }}
        </option>
      </select>
    </div>
  </div>

  <h1>Indicators</h1>
  <p>Number of products: {{ numberOfProducts }}</p>
  <p>Number of brands: {{ numberOfBrands }}</p>
  <p>Number of new products</p>
  <p>p50 price value</p>
  <p>p90 price value</p>
  <p>p95 price value</p>
  <p>Last released date</p>
  <button type="button" v-on:click="getReleased(products)">rel</button>

  <h1>Products</h1>
  <div v-for="products in products" v-bind:key="products.name">
    <li v-if="sortBrand(brandSelect, products.brand)">
      {{ products.name + products.brand + products.price + products.released }}
      <button type="button" v-on:click="toFav(products)">Fav</button>
    </li>
  </div>

  <h1>Favourites</h1>
  <button v-on:click="fetchFav()">Show favourites</button>
  <button v-on:click="clearFav()">Clear favourites</button>
  <div v-if="toggleFav">
    <li v-for="fav in fav" v-bind:key="fav.name">
      {{ fav.name + " " + fav.price }}
    </li>
  </div>
</template>

<script>
import axios from "axios";
const url = "https://clear-fashion-api.vercel.app/";
export default {
  data() {
    return {
      maxPage: 19,
      currentPage: 1,
      products: [],
      size: 0,
      brands: [],
      brandSelect: "",
      numberOfProducts: 0,
      numberOfBrands: 0,
      fav: [],
      toggleFav: false,
      productName: "",
    };
  },
  created() {
    this.getIndicators();
  },
  watch: {
    size: "fetchData",

    brandSelect: "sortBrand",
  },
  methods: {
    showFav() {
      this.toggleFav = !this.toggleFav;
    },
    async fetchData() {
      let data = await axios
        .get(url + `?size=${this.size}`)
        .then((res) => {
          this.products = res.data.data.result;
          let brand = axios.get(url + "brands").then((response) => {
            this.brands = response.data.data.result;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    sortBrand(brandSelect, products) {
      if (brandSelect === products) {
        return true;
      } else if (brandSelect === "" || brandSelect === "All products") {
        return true;
      }
    },

    sortDate(products) {
      const sortedDateAscend = products.sort(
        (a, b) => Date.parse(b.released) - Date.parse(a.released)
      );
      return sortedDateAscend;
    },

    sortPrice(products) {
      const sortedPriceAscend = products.sort((a, b) => a.price - b.price);
      return sortedPriceAscend;
    },
    async getIndicators() {
      let nbOfProducts = await axios.get(url).then((res) => {
        this.numberOfProducts = res.data.data.meta.count;
      });
      let brand = axios.get(url + "brands").then((response) => {
        this.numberOfBrands = response.data.data.result.length;
      });
    },

    toFav(products) {
      let favourites = [];
      favourites.push(products);
      localStorage.setItem(products.name, JSON.stringify(products));
    },
    clearFav() {
      localStorage.clear();
    },
    fetchFav() {
      let fav = [];
      for (let i = 0; i < localStorage.length; i++) {
        let keys = localStorage.key(i);
        let val = localStorage.getItem(keys);
        fav.push(JSON.parse(val));
      }
      this.fav = fav;
      this.toggleFav = !this.toggleFav;
      return this.fav;
    },
  },
};
</script>

<style>
@import "./css/homePage.css";
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;800&display=swap");
</style>
