import api from '@/helpers/api';

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
                const res = await api.post('signature/addNewSignature');
                console.log(res);

            } catch (error) {
                console.log(error);
            }
        }
    },

    namespaced: true,
}
