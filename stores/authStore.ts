import { defineStore } from "pinia";

export interface IAuthState {}

const basicState: IAuthState = {};

export default defineStore("auth-store", {
  state: (): IAuthState => ({ modalState: basicState }),
  actions: {},
  getters: {},
});
