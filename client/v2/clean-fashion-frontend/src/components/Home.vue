<template>
    <h1>Clear Fashion</h1> 
    <p>Show:</p><select v-model="size">
        <option>0</option>
        <option>12</option>
        <option>24</option>
        <option>48</option>
    </select>

    <p>Page: </p>
    <select v-model="currentPage">
        <option v-for="currentPage in maxPage">{{ currentPage }}</option>
    </select>

    <button type="button" v-on:click="sortDate(products)">By release date</button>
    <button type="button" v-on:click="sortPrice(products)">By price</button>

    <p>By brand:</p>
    <select v-model="brandSelect">
        <option disabled value="">Choose a brand</option>
        <option>All products</option>
        <option v-for="brands in brands" >{{ brands }}</option>
    </select>

    <h1>Indicators</h1>
    <p>Number of products: {{ numberOfProducts }}</p>
    <p>Number of brands: {{ numberOfBrands }}</p>
    <p>Number of new products</p>
    <p>p50 price value</p>
    <p>p90 price value</p>
    <p>p95 price value</p>
    <p>Last released date</p>

    <h1>Products</h1>
    <div v-for="products in products">
        <li  v-if="sortBrand(brandSelect,products.brand)">
        {{ 'Name: ' + products.name + ' Brand: '+products.brand + ' Price: ' + products.price + ' Release date: ' + products.released}} 
        <button type="button" v-on:click="toFav(products)">Fav</button>
        </li>
    </div>

    <h1>Favourites</h1>

    <li v-for="fav in fav">{{ fav}}</li>

</template>

<script>
import axios from 'axios';
    const url = 'https://clear-fashion-api.vercel.app/'
    export default {
        data() {
            return {
                maxPage: 19,
                currentPage: 1,
                products: [],
                size: 0,
                brands: [],
                brandSelect: '',
                numberOfProducts: 0,
                numberOfBrands: 0,
                fav: []
        }
        },
        created() {
            this.getIndicators();
            this.fetchFav();
        },
        watch: {
            size: 'fetchData',

            brandSelect: 'sortBrand'
        },
        methods: {
            async fetchData() {
                let data = await axios.get(url+`?size=${this.size}`)
                .then((res) => {
                    this.products = res.data.data.result;
                    let brand = axios.get(url+'brands')
                    .then((response) => {
                        this.brands = response.data.data.result;
                    })               
                })
                .catch((error) => {
                    console.log(error)
                })
            },

            sortBrand(brandSelect, products) { 
                if(brandSelect === products) { 
                    return true;
                } else if (brandSelect === '' || brandSelect==='All products') {return true}
            },

            sortDate(products) {
                const sortedDateAscend = products.sort((a, b) => (Date.parse(b.released) - Date.parse(a.released)));
                return sortedDateAscend;
            },

            sortPrice(products){
                const sortedPriceAscend  = products.sort((a, b) => (a.price-b.price))
                return sortedPriceAscend;
            },
            async getIndicators() {
                let nbOfProducts = await axios.get(url)
                .then((res) => {
                    this.numberOfProducts = res.data.data.meta.count;
                });
                let brand = axios.get(url+'brands')
                    .then((response) => {
                        this.numberOfBrands = response.data.data.result.length;
                    })                         
            },

            toFav(products) {
                let favourites = [];
                favourites.push(products);
                console.log(products.name)
                console.log(JSON.stringify(favourites))
                localStorage.setItem(products.name, JSON.stringify(products));
            },
            clearFav() {
                localStorage.clear();
            },
            fetchFav() {
                let fav = {...localStorage};
                fav = eval(fav);
                this.fav = fav;
                return Object.keys(fav);
            }
        },
    }
</script>

