import {createStore} from "zustand/vanilla";
import axios from 'axios';
import { supabase } from '../lib/supabaseClient'
import { jsonUsers } from '../constant';
import async from 'async';
const baseURL = 'http://localhost:3000';

const useUserStore = createStore((set, get) => ({
  loggedInUser: null,
  login: async (email, password) => {
    set({ loggedInUser: null });
    const user = { email, password };
    const existingUser = await get().checkIfUserExistInDB(user);
    if (existingUser) {
      const isLoggedIn = await get().signInUser(user);
      if (isLoggedIn) {
        set({ loggedInUser: existingUser });
        location.replace('/balance');
        return { success: true, message: "Success login" }
      } else {
        return { success: false, message: "Unable to login Please contact support for assistance." }
      }
    } else return { success: false, message: "Incorrect username or password." }
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      set({ loggedInUser: null }); 
      location.replace('/');
    }
  },
  addDefaultUsersIfNeeded: async () => {
    const { data } = await supabase.from('users').select().limit(1);
    if (data && !data.length) {
      async.mapSeries(jsonUsers, async (user) => {
        const { data } = await supabase.auth.signUp({ email: user.email, password: user.password });
        if (data) {
          user.guid = data.user.id;
          delete user._id;
          return { user, error: null };
        } else return { user, error: "error this record" };
      }, async (error, users) => {
        if (users.length === jsonUsers.length) {
          const newUsers = users.flatMap(item => item.error ? [] : item.user);
          await supabase.from('users').insert(newUsers);
        }
      });
    }
  },
  checkIfUserExistInDB: async (user) => {
    const { data } = await supabase
    .from('users')
    .select()
    .match({ ...user, isActive: true })
    .single()
    return data;
  },
  signInUser: async (user) => {
    // server side - authentication issue. it's only get the most recently logged in user.
    // const response = await axios.post(baseURL + '/login', user);
    // return response && response.data && response.data.success;

    const { error } = await supabase.auth.signInWithPassword(user);
    return !error;
  },
  getLoggedInUser: async () => {
    // server side - authentication issue. it's only get the most recently logged in user.
    // const response = await axios.get(baseURL + '/get-loggedinuser');
    // console.log('loggedIn', response)
    // if (response && response.data && response.data.success) {
    //   set({ loggedInUser: response.data.user });
    //   return true;
    // } else return false;

    const { data } = await supabase.auth.getUser();
    if (data.user && data.user.id) {
      const response = await supabase
      .from('users')
      .select()
      .match({ guid: data.user.id, isActive: true })
      .single()
      set({ loggedInUser: response.data });
      return true;
    } else return false;
  },
  update: async (user) => {
    if (get().loggedInUser && user && get().loggedInUser._id === user._id) {
      const { data, error } = await supabase
        .from('users')
        .update(user)
        .match({ _id: user._id });
      if (error) return { success: false, message: "user failed to update" }
      else return { success: true }
    } else return { success: false, message: "User not allow to perform this action." }
  }
}));

export default useUserStore;