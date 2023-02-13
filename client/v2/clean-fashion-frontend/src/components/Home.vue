<template>
    <h1>Clear Fashion</h1> 
    <p>Show:</p><select v-model="size">
        <option>0</option>
        <option>12</option>
        <option>24</option>
        <option>48</option>
    </select>

    <button type="button" v-on:click="byReasonablePrice()">By reasonable price</button>
    <button type="button" v-on:click="byReleased()">By recently released</button>

    <h1>Indicators</h1>

    <h1>Products</h1>
    <p v-for="products in products">{{ products.brand + ' ' + products.name + ' ' + products.price}}</p>


</template>

<script>
    import axios from 'axios';
    const url = 'https://clear-fashion-api.vercel.app/'
    export default {
        data() {
            return {
                brandSelection: '',
                products: [],
                size: 0,
        }
        },
        created() {
            this.fetchData()
        },
        watch: {
            size: 'fetchData'
        },
        methods: {
            async fetchData() {
                let data = await axios.get(url+`?size=${this.size}`)
                .then((res) => {
                    this.products = res.data.data.result               
                })
                .catch((error) => {
                    console.log(error)
                })
            },

        },


    }
</script>