import { _ as _sfc_main$1 } from './Icon-DGs3lips.mjs';
import { _ as _sfc_main$2 } from './Button-DyIBUF5Z.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { A as AppSidebar } from './AppSidebar-BuO0Enkh.mjs';
import { useRouter } from 'vue-router';
import './index-BirsLqLi.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import './nuxt-link-CVxP-D7F.mjs';

const _sfc_main = {
  __name: "user",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const users = ref([]);
    const loading = ref(false);
    const error = ref("");
    const searchQuery = ref("");
    const sortKey = ref("");
    const sortAsc = ref(true);
    const showEdit = ref(false);
    const editForm = ref({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      phone: "",
      address: ""
    });
    function getToken() {
      return localStorage.getItem("token") || "";
    }
    function getRoleColor(role) {
      const colors = {
        admin: "bg-green-100 text-green-800",
        user: "bg-blue-100 text-blue-800"
      };
      return colors[role.toLowerCase()] || "bg-gray-100 text-gray-800";
    }
    async function fetchUsers() {
      var _a;
      loading.value = true;
      error.value = "";
      try {
        const res = await $fetch("/users", {
          baseURL: "http://localhost:3000",
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        users.value = res.data;
      } catch (e) {
        error.value = ((_a = e.data) == null ? void 0 : _a.message) || e.message || "Failed to load users";
      } finally {
        loading.value = false;
      }
    }
    function viewUser(u) {
      router.push(`/users/${u.id}`);
    }
    async function openEdit(u) {
      var _a;
      showEdit.value = true;
      try {
        const res = await $fetch(`/users/${u.id}`, {
          baseURL: "http://localhost:3000",
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        const udata = res.data;
        editForm.value = {
          id: udata.id,
          firstName: udata.firstName,
          lastName: udata.lastName,
          email: udata.email,
          role: udata.role,
          phone: udata.phone,
          address: udata.address
        };
      } catch (e) {
        error.value = ((_a = e.data) == null ? void 0 : _a.message) || e.message;
      }
    }
    async function deleteUser(u) {
      var _a;
      if (!confirm(`Delete ${u.firstName} ${u.lastName}?`)) return;
      try {
        await $fetch(`/users/${u.id}`, {
          method: "DELETE",
          baseURL: "http://localhost:3000",
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        await fetchUsers();
      } catch (e) {
        error.value = ((_a = e.data) == null ? void 0 : _a.message) || e.message;
      }
    }
    const displayedUsers = computed(() => {
      let list = users.value.slice();
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        list = list.filter(
          (u) => `${u.firstName} ${u.lastName}`.toLowerCase().includes(q)
        );
      }
      if (sortKey.value) {
        list.sort((a, b) => {
          var _a, _b;
          let va = (_a = a[sortKey.value]) != null ? _a : "";
          let vb = (_b = b[sortKey.value]) != null ? _b : "";
          if (typeof va === "string") va = va.toLowerCase();
          if (typeof vb === "string") vb = vb.toLowerCase();
          if (va < vb) return sortAsc.value ? -1 : 1;
          if (va > vb) return sortAsc.value ? 1 : -1;
          return 0;
        });
      }
      return list;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_UButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(AppSidebar, null, null, _parent));
      _push(`<main class="flex-1 bg-gray-50 p-6"><div class="w-full bg-white shadow-sm rounded-lg p-6"><div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"><div><h1 class="text-3xl font-bold text-gray-900">User Management</h1><p class="text-gray-600 mt-1">Manage and view all users in the system</p></div><div class="mt-4 sm:mt-0"><div class="relative mt-4">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-search",
        class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search by name..." class="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-darkblue"></div></div></div>`);
      if (loading.value) {
        _push(`<div class="flex items-center justify-center py-12"><div class="flex items-center space-x-2 text-gray-600">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-loader-2",
          class: "animate-spin"
        }, null, _parent));
        _push(`<span>Loading users...</span></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"><div class="flex items-center space-x-2 text-red-700">`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-alert-circle" }, null, _parent));
        _push(`<span>${ssrInterpolate(error.value)}</span></div></div>`);
      } else {
        _push(`<div class="overflow-x-auto"><table class="w-full divide-y divide-gray-200 bg-white"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"> No. `);
        if (sortKey.value === "id") {
          _push(ssrRenderComponent(_component_UIcon, {
            name: sortAsc.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
            class: "inline-block ml-1 text-xs"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"> ID `);
        if (sortKey.value === "id") {
          _push(ssrRenderComponent(_component_UIcon, {
            name: sortAsc.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
            class: "inline-block ml-1 text-xs"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"> Name `);
        if (sortKey.value === "firstName") {
          _push(ssrRenderComponent(_component_UIcon, {
            name: sortAsc.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
            class: "inline-block ml-1 text-xs"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"> Email `);
        if (sortKey.value === "email") {
          _push(ssrRenderComponent(_component_UIcon, {
            name: sortAsc.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
            class: "inline-block ml-1 text-xs"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"> Role `);
        if (sortKey.value === "role") {
          _push(ssrRenderComponent(_component_UIcon, {
            name: sortAsc.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
            class: "inline-block ml-1 text-xs"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
        ssrRenderList(displayedUsers.value, (user, i) => {
          _push(`<tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${ssrInterpolate(i + 1)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${ssrInterpolate(user.id)}</td><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center"><div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-user",
            class: "text-gray-600 text-sm"
          }, null, _parent));
          _push(`</div><div class="ml-3"><div class="text-sm font-medium text-gray-900">${ssrInterpolate(user.firstName)} ${ssrInterpolate(user.lastName)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(user.email)}</td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass([getRoleColor(user.role), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}">${ssrInterpolate(user.role)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"><div class="flex space-x-2 text-green-500">`);
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            class: "cp hover:bg-green-100",
            size: "sm",
            icon: "i-lucide-eye",
            onClick: ($event) => viewUser(user)
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            class: "cp hover:bg-green-100",
            size: "sm",
            icon: "i-lucide-edit",
            onClick: ($event) => openEdit(user)
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            class: "cp hover:bg-green-100",
            size: "sm",
            icon: "i-lucide-trash",
            onClick: ($event) => deleteUser(user)
          }, null, _parent));
          _push(`</div></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
        if (displayedUsers.value.length === 0) {
          _push(`<div class="text-center py-12">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-users",
            class: "text-gray-400 text-4xl mb-4"
          }, null, _parent));
          _push(`<h3 class="text-lg font-medium text-gray-900 mb-2">No users found</h3><p class="text-gray-500">Try adjusting your search or sort.</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      if (showEdit.value) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"><div class="bg-darkblue text-white px-6 py-4 flex justify-between items-center"><h3 class="text-xl font-semibold">Edit User Profile</h3><button class="text-white text-2xl">`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-x" }, null, _parent));
        _push(`</button></div><div class="p-6"><form class="space-y-5"><div class="grid grid-cols-2 gap-4"><div class="group"><label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-user",
          class: "text-blue-500"
        }, null, _parent));
        _push(`<span>First Name</span></label><input${ssrRenderAttr("value", editForm.value.firstName)} type="text" placeholder="Enter first name" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 group-hover:border-gray-300 text-black"></div><div class="group"><label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-user",
          class: "text-blue-500"
        }, null, _parent));
        _push(`<span>Last Name</span></label><input${ssrRenderAttr("value", editForm.value.lastName)} type="text" placeholder="Enter last name" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 group-hover:border-gray-300 text-black"></div></div><div class="group"><label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-mail",
          class: "text-green-500"
        }, null, _parent));
        _push(`<span>Email Address</span></label><input${ssrRenderAttr("value", editForm.value.email)} type="email" placeholder="Enter email address" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 group-hover:border-gray-300 text-black"></div><div class="grid grid-cols-2 gap-4"><div class="group"><label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-shield-check",
          class: "text-purple-500"
        }, null, _parent));
        _push(`<span>Role</span></label><select class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 group-hover:border-gray-300 bg-white text-black"><option value="user" class="text-black"${ssrIncludeBooleanAttr(Array.isArray(editForm.value.role) ? ssrLooseContain(editForm.value.role, "user") : ssrLooseEqual(editForm.value.role, "user")) ? " selected" : ""}>\u{1F464} User</option><option value="admin" class="text-black"${ssrIncludeBooleanAttr(Array.isArray(editForm.value.role) ? ssrLooseContain(editForm.value.role, "admin") : ssrLooseEqual(editForm.value.role, "admin")) ? " selected" : ""}>\u26A1 Admin</option></select></div><div class="group"><label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-phone",
          class: "text-orange-500"
        }, null, _parent));
        _push(`<span>Phone Number</span></label><input${ssrRenderAttr("value", editForm.value.phone)} type="text" placeholder="Enter phone number" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 group-hover:border-gray-300 text-black"></div></div><div class="group"><label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-map-pin",
          class: "text-red-500"
        }, null, _parent));
        _push(`<span>Address</span></label><textarea placeholder="Enter full address" rows="3" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 group-hover:border-gray-300 resize-none text-black">${ssrInterpolate(editForm.value.address)}</textarea></div><div class="flex justify-end space-x-3 pt-4 border-t border-gray-100"><button type="button" class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-x",
          class: "text-sm"
        }, null, _parent));
        _push(`<span>Cancel</span></button><button type="submit" class="px-6 py-3 bg-darkblue text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-save",
          class: "text-sm"
        }, null, _parent));
        _push(`<span>Save Changes</span></button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=user-Qf5UIeRm.mjs.map
