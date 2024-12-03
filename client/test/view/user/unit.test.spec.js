// const { default: Login } = require("@/views/users/Login.vue");
import Balance from '@/views/users/Balance.vue';
import Layout from '@/views/users/Layout.vue';
import Login from '@/views/users/Login.vue';
import Update from '@/views/users/Update.vue';
import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

describe('Render text contain when component is created', () => {
    it('Login.vue render text contain', () => {
        const wrapper = shallowMount(Login);
        expect(wrapper.text()).toBe('UsernamePasswordLogin');
        expect(wrapper.vm.email).toBe("");
        expect(wrapper.vm.password).toBe("");
        expect(wrapper.vm.submitting).toBeFalsy();
        expect(!!wrapper.vm.login).toBeTruthy();
    });

    it('Layout.vue render text contain', () => {
        const wrapper = shallowMount(Layout);
        expect(wrapper.text()).toBe('BALANCEEDITlogout');
        expect(wrapper.vm.loggedInUser).toBeNull();
        expect(wrapper.vm.defaultImage).toBe("/src/assets/person.jpg");
        expect(!!wrapper.vm.logout).toBeTruthy();
    });

    it('Balance.vue render text contain', () => {
        const wrapper = shallowMount(Balance);
        expect(wrapper.text()).toBe('');
        expect(wrapper.vm.loggedInUser).toBeNull();
    });

    it('Update.vue render text contain', () => {
        const wrapper = shallowMount(Update);
        expect(wrapper.text()).toBe('');
        expect(wrapper.vm.loggedInUser).toBeNull();
        expect(wrapper.vm.firstName).toBe("");
        expect(wrapper.vm.lastName).toBe("");
        expect(wrapper.vm.address).toBe("");
        expect(wrapper.vm.phone).toBe("");
        expect(wrapper.vm.submitting).toBeFalsy();
        expect(!!wrapper.vm.update).toBeTruthy();
    });
});