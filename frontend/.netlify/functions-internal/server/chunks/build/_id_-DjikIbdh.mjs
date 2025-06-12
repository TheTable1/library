import { _ as _sfc_main$1 } from './Icon-DGs3lips.mjs';
import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { A as AppSidebar } from './AppSidebar-BuO0Enkh.mjs';
import { useRoute } from 'vue-router';
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

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    route.params.id;
    const user = ref(null);
    const loading = ref(false);
    const error = ref("");
    function getRoleGradient(role) {
      const gradients = {
        admin: "bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-300/50",
        user: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-300/50"
      };
      return gradients[role.toLowerCase()] || "bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-300/50";
    }
    function getDaysAsMember(memberSinceText) {
      if (!memberSinceText) return 0;
      try {
        const thaiMonths = {
          "\u0E21\u0E01\u0E23\u0E32\u0E04\u0E21": 0,
          "\u0E01\u0E38\u0E21\u0E20\u0E32\u0E1E\u0E31\u0E19\u0E18\u0E4C": 1,
          "\u0E21\u0E35\u0E19\u0E32\u0E04\u0E21": 2,
          "\u0E40\u0E21\u0E29\u0E32\u0E22\u0E19": 3,
          "\u0E1E\u0E24\u0E29\u0E20\u0E32\u0E04\u0E21": 4,
          "\u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19": 5,
          "\u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21": 6,
          "\u0E2A\u0E34\u0E07\u0E2B\u0E32\u0E04\u0E21": 7,
          "\u0E01\u0E31\u0E19\u0E22\u0E32\u0E22\u0E19": 8,
          "\u0E15\u0E38\u0E25\u0E32\u0E04\u0E21": 9,
          "\u0E1E\u0E24\u0E28\u0E08\u0E34\u0E01\u0E32\u0E22\u0E19": 10,
          "\u0E18\u0E31\u0E19\u0E27\u0E32\u0E04\u0E21": 11
        };
        const parts = memberSinceText.split(" ");
        if (parts.length >= 3) {
          const day = parseInt(parts[0]);
          const month = thaiMonths[parts[1]];
          const year = parseInt(parts[2]) - 543;
          if (!isNaN(day) && month !== void 0 && !isNaN(year)) {
            const memberDate = new Date(year, month, day);
            const today = /* @__PURE__ */ new Date();
            const diffTime = Math.abs(today - memberDate);
            const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
            return diffDays.toLocaleString();
          }
        }
      } catch (e) {
        console.error("Error parsing date:", e);
      }
      return 0;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" }, _attrs))}>`);
      _push(ssrRenderComponent(AppSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-4 lg:p-8"><div class="max-w-6xl mx-auto">`);
      if (loading.value) {
        _push(`<div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-white/20"><div class="relative w-16 h-16 mx-auto mb-6"><div class="absolute inset-0 border-4 border-blue-100 rounded-full animate-pulse"></div><div class="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div><p class="text-slate-600 text-lg font-medium">Loading user details...</p></div>`);
      } else if (error.value) {
        _push(`<div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-red-100"><div class="flex items-center space-x-4 text-red-600"><div class="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-alert-circle",
          class: "text-2xl"
        }, null, _parent));
        _push(`</div><div><h3 class="font-bold text-lg">An Error Occurred</h3><p class="text-red-500 mt-1">${ssrInterpolate(error.value)}</p></div></div></div>`);
      } else if (user.value) {
        _push(`<div class="space-y-8 animate-fade-in"><div class="relative overflow-hidden bg-darkblue rounded-3xl shadow-2xl"><div class="relative p-8 lg:p-12"><div class="flex lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8"><div class="relative group"><div class="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/20 transition-all duration-300">`);
        if (user.value.photo) {
          _push(`<img${ssrRenderAttr("src", user.value.photo)} alt="User photo" class="object-cover w-full h-full transition-all duration-300 group-hover:scale-110" loading="lazy">`);
        } else {
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-user",
            class: "text-white/60 text-6xl"
          }, null, _parent));
        }
        _push(`</div></div><div class="flex-1 text-center lg:text-left"><h1 class="text-3xl font-bold text-white mb-3 drop-shadow-lg">${ssrInterpolate(user.value.firstName)} ${ssrInterpolate(user.value.lastName)}</h1><div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6"><span class="${ssrRenderClass([getRoleGradient(user.value.role), "inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30 transition-all duration-300 hover:bg-white/30 mb-4"])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-shield-check",
          class: "mr-2 text-sm"
        }, null, _parent));
        _push(` ${ssrInterpolate(user.value.role)}</span><span class="text-white/80 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-2"> User ID : ${ssrInterpolate(user.value.id)}</span><span class="text-white/80 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"> Member since ${ssrInterpolate(user.value.memberSince)}</span></div></div><div>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: `/users/users-list/${user.value.id}`,
          class: "px-3 py-2 bg-white/50 rounded-xl text-sm font-medium text-slate-800 hover:bg-white/70 cp"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`List Detail`);
            } else {
              return [
                createTextVNode("List Detail")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/50 p-8 transition-all duration-300 hover:bg-white/80 hover:border-slate-300/60 hover:shadow-lg"><div class="mb-8"><h2 class="text-lg font-medium text-slate-900 mb-2">Contact Information</h2><div class="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div></div><div class="space-y-8"><div class="group"><div class="flex items-center space-x-4"><div class="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-100 transition-colors duration-200">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-mail",
          class: "text-slate-600 text-blue-600 transition-colors duration-200"
        }, null, _parent));
        _push(`</div><div class="flex-1"><p class="text-xs font-medium text-slate-500 mb-1">Email</p><p class="text-slate-900 font-medium">${ssrInterpolate(user.value.email)}</p></div></div></div><div class="group"><div class="flex items-center space-x-4"><div class="w-10 h-10 rounded-2xl flex items-center justify-center bg-emerald-100 transition-colors duration-200">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-phone",
          class: "text-slate-600 text-emerald-600 transition-colors duration-200"
        }, null, _parent));
        _push(`</div><div class="flex-1"><p class="text-xs font-medium text-slate-500 mb-1">Phone Number</p><p class="text-slate-900 font-medium">${ssrInterpolate(user.value.phone || "Not specified")}</p></div></div></div></div></div><div class="bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/50 p-8 transition-all duration-300 hover:bg-white/80 hover:border-slate-300/60 hover:shadow-lg"><div class="mb-8"><h2 class="text-lg font-medium text-slate-900 mb-2">Account Information</h2><div class="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div></div><div class="space-y-8"><div class="group"><div class="flex items-center space-x-4"><div class="w-10 h-10 rounded-2xl flex items-center justify-center bg-purple-100 transition-colors duration-200">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-shield-check",
          class: "text-slate-600 text-purple-600 transition-colors duration-200"
        }, null, _parent));
        _push(`</div><div class="flex-1"><p class="text-xs font-medium text-slate-500 mb-1">Role</p><p class="text-slate-900 font-medium capitalize">${ssrInterpolate(user.value.role)}</p></div></div></div><div class="group"><div class="flex items-center space-x-4"><div class="w-10 h-10 rounded-2xl flex items-center justify-center bg-indigo-100 transition-colors duration-200">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-calendar",
          class: "text-slate-600 group-hover:text-indigo-600 transition-colors duration-200"
        }, null, _parent));
        _push(`</div><div class="flex-1"><p class="text-xs font-medium text-slate-500 mb-1">Member for</p><p class="text-slate-900 font-medium">${ssrInterpolate(getDaysAsMember(user.value.memberSince))} days</p></div></div></div></div></div></div><div class="bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/50 p-8 transition-all duration-300 hover:bg-white/80 hover:border-slate-300/60 hover:shadow-lg"><div class="mb-8"><h2 class="text-lg font-medium text-slate-900 mb-2">Address</h2><div class="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent"></div></div><div class="group"><div class="flex items-start space-x-4"><div class="w-10 h-10 rounded-2xl flex items-center justify-center bg-emerald-100 transition-colors duration-200 flex-shrink-0 mt-1">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-map-pin",
          class: "text-slate-600 text-emerald-600 transition-colors duration-200"
        }, null, _parent));
        _push(`</div><div class="flex-1 pt-2"><p class="text-slate-900 font-medium leading-relaxed">${ssrInterpolate(user.value.address || "No address specified")}</p></div></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DjikIbdh.mjs.map
