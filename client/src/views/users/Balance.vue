<script>
import Layout from './Layout.vue';
import useUserStore from '../../store/useUserStore';
export default {
    data() {
        return {
            loggedInUser: null
        }
    }, 
    components: {
        Layout
    },
    async mounted() {
        this.loggedInUser = await useUserStore.getState().loggedInUser;
    }
}
</script>
<template>
    <Layout>
        <div class="overview balance">
            <div class="total-balance">
                <label>Total Balance</label>
                <div class="-value">{{ loggedInUser?.balance || "$0.00" }}</div>
            </div>
            <div class="section">
                <label>Username:</label>
                <span>{{ loggedInUser?.email }}</span>
            </div>
            <div class="section">
                <label>Name:</label>
                <span>{{ loggedInUser?.name.first }} {{ loggedInUser?.name.last }}</span>
            </div>
            <div class="section">
                <label>Age:</label>
                <span>{{ loggedInUser?.age }}</span>
            </div>
            <div class="section">
                <label>Phone:</label>
                <span>{{ loggedInUser?.phone }}</span>
            </div>
            <div class="section">
                <label>Address:</label>
                <span>{{ loggedInUser?.address }}</span>
            </div>
        </div>
    </Layout>
</template>

<style>
.overview.balance {
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 1em;
}
.total-balance {
    min-width: 260px;
    text-align: center;
    border: 1px solid #cacccc;
    border-radius: 0.5em;
    padding: 10px 0;
    margin-bottom: 1em;
}
</style>