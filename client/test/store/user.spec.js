import { describe, it, expect } from "vitest";
import useUserStore from "@/store/useUserStore";
import _cloneDeep from 'lodash/cloneDeep';

describe('testing zustand store as instance', () => {
    it('login user - success login', async () => {
        const email = "henderson.briggs@geeknet.net";
        const password = "23derd*334";
        const result = await useUserStore.getState().login(email, password);
        expect(result.success).toBeTruthy();
        expect(result.message).toBe('Success login');
        expect(!!useUserStore.getState().loggedInUser).toBeTruthy();
    });

    it('login user - unsuccessful login - inactive user', async () => {
        const email = "boyd.small@endipine.biz";
        const password = "_4rhododfj";
        const result = await useUserStore.getState().login(email, password);
        expect(result.success).toBeFalsy();
        expect(result.message).toBe('Incorrect username or password.');
        expect(!!useUserStore.getState().loggedInUser).toBeFalsy()
    });

    it('login user - unsuccessful login - user not listed in auth', async () => {
        const email = "ruby.glenn@waterbaby.co.uk";
        const password = "red^adl4";
        const result = await useUserStore.getState().login(email, password);
        expect(result.success).toBeFalsy();
        expect(result.message).toBe('Unable to login Please contact support for assistance.');
        expect(!!useUserStore.getState().loggedInUser).toBeFalsy();
    });

    it('logout user', async () => {
        const result = await useUserStore.getState().logout();
        expect(!!useUserStore.getState().loggedInUser).toBeFalsy();
    });

    it('check if user exist in db - exist', async () => {
        const email = "henderson.briggs@geeknet.net";
        const password = "23derd*334";
        const result = await useUserStore.getState().checkIfUserExistInDB({ email, password });
        expect(!!result).toBeTruthy();
    });

    it('check if user exist in db - not exist', async () => {
        const email = "imnotexisted.user@test.net";
        const password = "23derd*334";
        const result = await useUserStore.getState().checkIfUserExistInDB({ email, password });
        expect(result).toBeNull();
    });

    it('sign in - success', async () => {
        const email = "henderson.briggs@geeknet.net";
        const password = "23derd*334";
        const result = await useUserStore.getState().signInUser({ email, password });
        expect(result).toBeTruthy();
    });

    it('sign in - unsuccess', async () => {
        const email = "ruby.glenn@waterbaby.co.uk";
        const password = "red^adl4";
        const result = await useUserStore.getState().signInUser({ email, password });
        expect(result).toBeFalsy();
    });

    it('get loggedin user - login then check loggedInUser details', async () => {
        const email = "henderson.briggs@geeknet.net";
        const password = "23derd*334";
        await useUserStore.getState().login(email, password);
        const result = await useUserStore.getState().getLoggedInUser();
        expect(result).toBeTruthy();
    });

    it('get loggedin user - logout then check loggedInUser details', async () => {
        await useUserStore.getState().logout();
        const result = await useUserStore.getState().getLoggedInUser();
        expect(result).toBeFalsy();
    });

    it('update user - unsuccess', async () => {
        const email = "henderson.briggs@geeknet.net";
        const password = "23derd*334";
        await useUserStore.getState().login(email, password);
        const loggedInUser = _cloneDeep(useUserStore.getState().loggedInUser);
        loggedInUser._id = -1;
        loggedInUser.name.address = "Q.C, happyland st. alley phase " + new Date().getTime();
        const result = await useUserStore.getState().update(loggedInUser);
        expect(result.success).toBeFalsy();
        expect(result.message).toBe('User not allow to perform this action.');
    });
});