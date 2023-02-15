<template>
    <h1>Clear Fashion</h1> 
    <p>Show:</p><select v-model="size">
        <option>0</option>
        <option>12</option>
        <option>24</option>
        <option>48</option>
    </select>

    <p>By brand:</p>
    <select v-model="brandSelect">
        <option disabled>Choose a brand</option>
        <option v-for="brands in brands" >{{ brands }}</option>
    </select>



    <h1>Indicators</h1>

    <h1>Products</h1>
    
    <div v-for="products in products">
        <li v-if="sortBrand(brandSelect,products.brand)">
        {{ products.brand + ' '+products.name + ' ' + products.price }} 
        </li>
    </div>




    


</template>

<script>
import axios from 'axios';
    const url = 'https://clear-fashion-api.vercel.app/'
    export default {
        data() {
            return {
                products: [],
                size: 0,
                brands: [],
                brandSelect: ''
        }
        },
        created() {
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
                return brandSelect === products;
            }
        },
    }
</script>