<script>
import Layout from './Layout.vue';
import useUserStore from '../../store/useUserStore';
export default {
    data() {
        return {
            loggedInUser: null,
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            submitting: false
        }
    },
    methods: {
        async update() {
            this.submitting = true;
            this.loggedInUser.name.first = this.firstName;
            this.loggedInUser.name.last = this.lastName;
            this.loggedInUser.phone = this.phone;
            this.loggedInUser.address = this.address;
            const response = await useUserStore.getState().update(this.loggedInUser);
            if (!response.success) alert(response.message);
            this.submitting = false;
        },
    },
    components: {
        Layout
    },
    async mounted() {
        const user = await useUserStore.getState().loggedInUser;
        if (user) {
            this.loggedInUser = user;
            this.firstName = user.name.first;
            this.lastName = user.name.last;
            this.phone = user.phone;
            this.address = user.address;
        }
    }
}
</script>
<template>
    <Layout>
        <div class="overview update">
            <div class="section">
                <label>First Name:</label>
                <input v-model="firstName" type="text" class="form-control" placeholder="First name">
            </div>
            <div class="section">
                <label>Last Name:</label>
                <input v-model="lastName" type="text" class="form-control" placeholder="First name">
            </div>
            <div class="section">
                <label>Phone:</label>
                <input v-model="phone" type="text" class="form-control" placeholder="Phone number">
            </div>
            <div class="section">
                <label>Address:</label>
                <textarea v-model="address" placeholder="Address"></textarea>
            </div>
            <div class="section">
                <button class="btn" @click="update" :disabled="
                submitting ||
                loggedInUser?.name.first && loggedInUser?.name.last && loggedInUser.phone && loggedInUser.address
                && firstName && lastName && phone && address
                && loggedInUser?.name.first.toLocaleLowerCase() === firstName.toLocaleLowerCase().trim() 
                && loggedInUser?.name.last.toLocaleLowerCase() === lastName.toLocaleLowerCase().trim()
                && loggedInUser?.phone.toLocaleLowerCase() === phone.toLocaleLowerCase().trim()
                && loggedInUser?.address.toLocaleLowerCase() === address.toLocaleLowerCase().trim()">SAVE
                </button>
            </div>
        </div>
    </Layout>
</template>

<style>
.overview.update {
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 1em;
}

.section {
    max-width: 260px;
    width: 100%;
}

.update .section {
    display: grid;
}

.section span {
    font-size: 1.01em;
}
.section label {
    margin-right: 5px;
}
textarea {
    min-height: 50px;
    border: 1px solid #e7e4e4;
    border-radius: 3px;
    padding: 1em;
}
.section:has(.btn) {
    grid-template-columns: 70%;
    justify-content: center;
    align-items: center;
}
.btn {
    height: 35px;
    border: none;
    font-weight: 700;
    background-color: #cacccc;
    color: #000000;
    border-radius: 3px;
    font-size: 1em;
    cursor: pointer;
}

.btn:disabled {
    color: #898f8f;
}

</style>