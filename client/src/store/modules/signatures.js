import api from '@/helpers/api';
import Cookies from 'js-cookie'

export const Signatures = {
    state: () => ({
        
    }),

    getters: {
        
    },

    mutations: {
        
    },

    actions: {
        async login({ commit }, userName) {
            try {
                const data = {
                    userName: userName
                }

                const res = await api.post('signature/login', data);
                Cookies.set('userName', res.data?.userName)

                if (res.data.status == 'new')
                    window.location = '/signatures'
                else
                window.location = '/checkSignatures'
            } catch (error) {
                console.log(error);
                commit('setHint', ['Ошибка авторизации', false], { root: true });
            }
        },
        async addSignatures({ commit }, allSignatures) {
            try {
                const data = {
                    signatures: allSignatures,
                    userName: Cookies.get('userName')
                }

                await api.post('signature/addNewSignatures', data);
                Cookies.remove('userName')
                
                window.location = '/'
            } catch (error) {
                console.log(error);
                alert(error.response.data.message)
            }
        },
        async checkSignature({ commit }, signature) {
            try {
                const data = {
                    signature: signature,
                    userName: Cookies.get('userName')
                }

                const res = await api.post('signature/compareSignatures', data);

                commit('setHint', [res.data.message, true], { root: true });
            } catch (error) {
                console.log(error);
                commit('setHint', [error.response.data.message, false], { root: true });
            }
        }
    },

    namespaced: true,
}
