import { _ as _sfc_main$1 } from './Icon-DGs3lips.mjs';
import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const user = ref(null);
    const loading = ref(false);
    const error = ref("");
    const showPhotoModal = ref(false);
    const photoForm = ref({ photo: "" });
    const showEditProfile = ref(false);
    const editForm = ref({ id: null, password: "", confirmPassword: "" });
    const confirmError = ref("");
    useRouter();
    function getRoleGradient(role) {
      const grads = {
        admin: "bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-300/50",
        user: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-300/50"
      };
      return grads[role.toLowerCase()] || "bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-300/50";
    }
    function getDaysAsMember(text) {
      if (!text) return 0;
      try {
        const months = {
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
        const [d, m, y] = text.split(" ");
        const date = new Date(y - 543, months[m], +d);
        return Math.ceil((Date.now() - date) / 864e5);
      } catch {
        return 0;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen bg-gray-100" }, _attrs))}>`);
      _push(ssrRenderComponent(AppSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6 lg:p-10"><div class="max-w-4xl mx-auto space-y-10">`);
      if (loading.value) {
        _push(`<div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-gray-200"><div class="relative w-16 h-16 mx-auto mb-6"><div class="absolute inset-0 border-4 border-blue-100 rounded-full animate-pulse"></div><div class="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div><p class="text-gray-600 text-lg font-medium">Loading user details...</p></div>`);
      } else if (error.value) {
        _push(`<div class="bg-white rounded-2xl shadow-lg p-8 border border-red-200 flex items-center space-x-4"><div class="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-alert-circle",
          class: "text-red-500 text-2xl"
        }, null, _parent));
        _push(`</div><div><h3 class="text-red-700 font-semibold text-lg">An Error Occurred</h3><p class="text-red-500 mt-1">${ssrInterpolate(error.value)}</p></div></div>`);
      } else if (user.value) {
        _push(`<div class="space-y-10 animate-fade-in"><div class="bg-darkblue rounded-3xl shadow-xl overflow-hidden"><div class="p-8 lg:p-12"><div class="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8"><div class="relative group flex-shrink-0"><div class="cursor-pointer w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/20 transition-transform duration-300 group-hover:scale-105">`);
        if (user.value.photo) {
          _push(`<img${ssrRenderAttr("src", user.value.photo)} alt="User photo" class="object-cover w-full h-full">`);
        } else {
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-user",
            class: "text-white/60 text-5xl md:text-6xl"
          }, null, _parent));
        }
        _push(`</div></div><div class="flex-1 text-center lg:text-left"><h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-3 drop-shadow-lg">${ssrInterpolate(user.value.firstName)} ${ssrInterpolate(user.value.lastName)}</h1><div class="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4"><span class="${ssrRenderClass([getRoleGradient(user.value.role), "flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold bg-white/20 text-white border border-white/30 backdrop-blur-sm"])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-shield-check",
          class: "mr-1 md:mr-2 text-white text-xs md:text-sm"
        }, null, _parent));
        _push(` ${ssrInterpolate(user.value.role)}</span><span class="text-white/80 text-xs md:text-sm font-medium bg-white/10 px-3 py-1 md:px-4 md:py-2 rounded-full backdrop-blur-sm"> User ID: ${ssrInterpolate(user.value.id)}</span></div></div><div class="flex mt-3 sm:flex-row items-center sm:items-start gap-3"><button class="px-3 py-2 bg-white/50 rounded-xl text-xs md:text-sm font-medium hover:bg-white/70 transition"> Change Password </button>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: `/profileDetail/${user.value.id}`,
          class: "px-3 py-2 bg-white/50 rounded-xl text-xs md:text-sm font-medium hover:bg-white/70 transition"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` My List `);
            } else {
              return [
                createTextVNode(" My List ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="px-3 py-2 bg-white/50 rounded-xl text-xs md:text-sm font-medium hover:bg-white/70 transition"> Logout </button></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="bg-white rounded-3xl shadow-md p-6"><h2 class="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2><div class="h-1 w-16 bg-gradient-to-r from-blue-500 to-transparent mb-6"></div><div class="space-y-6"><div class="flex items-center space-x-4"><div class="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-mail",
          class: "text-blue-600 text-xl"
        }, null, _parent));
        _push(`</div><div><p class="text-xs text-gray-500">Email</p><p class="text-gray-800 font-medium">${ssrInterpolate(user.value.email)}</p></div></div><div class="flex items-center space-x-4"><div class="w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-full">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-phone",
          class: "text-emerald-600 text-xl"
        }, null, _parent));
        _push(`</div><div><p class="text-xs text-gray-500">Phone Number</p><p class="text-gray-800 font-medium">${ssrInterpolate(user.value.phone || "Not specified")}</p></div></div></div></div><div class="bg-white rounded-3xl shadow-md p-6"><h2 class="text-xl font-semibold text-gray-800 mb-4">Account Information</h2><div class="h-1 w-16 bg-gradient-to-r from-purple-500 to-transparent mb-6"></div><div class="space-y-6"><div class="flex items-center space-x-4"><div class="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-shield-check",
          class: "text-purple-600 text-xl"
        }, null, _parent));
        _push(`</div><div><p class="text-xs text-gray-500">Role</p><p class="text-gray-800 font-medium capitalize">${ssrInterpolate(user.value.role)}</p></div></div><div class="flex items-center space-x-4"><div class="w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-full">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-calendar",
          class: "text-indigo-600 text-xl"
        }, null, _parent));
        _push(`</div><div><p class="text-xs text-gray-500">Member for</p><p class="text-gray-800 font-medium">${ssrInterpolate(getDaysAsMember(user.value.memberSince))} days</p><p class="text-xs text-gray-500">Member since ${ssrInterpolate(user.value.memberSince)}</p></div></div></div></div></div><div class="bg-white rounded-3xl shadow-md p-6"><h2 class="text-xl font-semibold text-gray-800 mb-4">Address</h2><div class="h-1 w-16 bg-gradient-to-r from-emerald-500 to-transparent mb-6"></div><div class="flex items-start space-x-4"><div class="w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-full mt-1">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-map-pin",
          class: "text-emerald-600 text-xl"
        }, null, _parent));
        _push(`</div><div><p class="text-gray-800 font-medium leading-relaxed">${ssrInterpolate(user.value.address || "No address specified")}</p></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></main>`);
      if (showPhotoModal.value) {
        _push(`<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-2xl shadow-xl w-full max-w-md"><div class="bg-darkblue text-white px-6 py-4 flex justify-between items-center rounded-t-2xl"><h3 class="text-xl font-semibold">Change Photo</h3><button class="text-white text-2xl">`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-x" }, null, _parent));
        _push(`</button></div><div class="p-6"><form class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Photo URL</label><input${ssrRenderAttr("value", photoForm.value.photo)} type="url" placeholder="https://example.com/your-image.jpg" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" required></div><div class="flex justify-end space-x-4 pt-4 border-t border-gray-200"><button type="button" class="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"> Cancel </button><button type="submit" class="px-5 py-2 bg-darkblue text-white rounded-lg hover:bg-indigo-700"> Save Photo </button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showEditProfile.value) {
        _push(`<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-2xl shadow-xl w-full max-w-md"><div class="bg-darkblue text-white px-6 py-4 flex justify-between items-center rounded-t-2xl"><h3 class="text-xl font-semibold">Edit Profile</h3><button class="text-white text-2xl">`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-x" }, null, _parent));
        _push(`</button></div><div class="p-6"><form class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">New Password</label><input${ssrRenderAttr("value", editForm.value.password)} type="password" placeholder="New Password" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label><input${ssrRenderAttr("value", editForm.value.confirmPassword)} type="password" placeholder="Confirm Password" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200">`);
        if (confirmError.value) {
          _push(`<p class="mt-1 text-red-500 text-xs">${ssrInterpolate(confirmError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex justify-end space-x-4 pt-4 border-t border-gray-200"><button type="button" class="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"> Cancel </button><button type="submit" class="px-5 py-2 bg-darkblue text-white rounded-lg hover:bg-indigo-700"> Save Changes </button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-DpRWsKqV.mjs.map
