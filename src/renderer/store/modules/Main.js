import VkAuth from '@/models/Vk/Auth'
import TrelloAuth from '@/models/Trello/Auth'
import _ from 'lodash';

const vk_auth = VkAuth();

const trello_auth = TrelloAuth();

let groups = localStorage.getItem('groups');
if (groups) {
    groups = JSON.parse(groups);
}

const state = {
    is_vk_auth:      vk_auth.isAuth(),
    is_trello_auth:  trello_auth.isAuth(),
    vk_token:        vk_auth.token(),
    trello_token:    trello_auth.token(),
    groups_selected: groups ? groups : []
};
console.log(state);

const mutations = {
    setVkAuth(state, value) {
        state.is_vk_auth = value;
    },
    setVkToken(state, token) {
        state.vk_token = token;
    },
    setTrelloAuth(state, value) {
        state.is_trello_auth = value;
    },
    setTrelloToken(state, token) {
        state.trello_token = token;
    },
    addGroup(state, group) {
        let groups = state.groups_selected;
        groups.push(group);
        groups = _.uniqBy(groups, (group_id) => {
            return group_id;
        });
        localStorage.setItem('groups', JSON.stringify(groups));
        state.groups_selected = groups;
    },
    removeGroup(state, group) {
        const groups = _.filter(state.groups_selected, (group_id) => {
            return group_id !== group;
        });
        localStorage.setItem('groups', JSON.stringify(groups));
        state.groups_selected = groups;

    }
};

const actions = {
    setVkAuth({commit}, {token}) {
        commit('setVkAuth', true);
        commit('setVkToken', token);
    },
    setTrelloAuth({commit}, {token}) {
        commit('setTrelloAuth', true);
        commit('setTrelloToken', token);
    },
    addGroup({commit}, {group}) {
        commit('addGroup', group);
    },
    removeGroup({commit}, {group}) {
        commit('removeGroup', group);
    }
};

export default {
    state,
    mutations,
    actions
}
