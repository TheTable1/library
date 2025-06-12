import { _ as _sfc_main$1 } from './Icon-DGs3lips.mjs';
import { ref, computed, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { A as AppSidebar } from './AppSidebar-BuO0Enkh.mjs';
import { useRoute, useRouter } from 'vue-router';
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
    useRouter();
    route.params.id;
    const user = ref(null);
    const lists = ref([]);
    const loadingUser = ref(false);
    const loadingLists = ref(false);
    const errorUser = ref("");
    const errorLists = ref("");
    const filterStatus = ref("borrowed");
    function formatDateEnglish(dateString) {
      if (!dateString) return "-";
      try {
        const d = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return d.toLocaleDateString("en-US", options);
      } catch {
        return dateString;
      }
    }
    function getRoleGradient(role) {
      const gradients = {
        admin: "bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-300/50",
        user: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-300/50"
      };
      return gradients[role.toLowerCase()] || "bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-300/50";
    }
    const filteredLists = computed(() => {
      return lists.value.filter((item) => item.status === filterStatus.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" }, _attrs))}>`);
      _push(ssrRenderComponent(AppSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6 lg:p-10"><div class="max-w-4xl mx-auto">`);
      if (loadingUser.value || loadingLists.value) {
        _push(`<div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 text-center border border-white/20"><div class="relative w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6"><div class="absolute inset-0 border-4 border-blue-100 rounded-full animate-pulse"></div><div class="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div><p class="text-slate-600 text-base md:text-lg font-medium">Loading data...</p></div>`);
      } else if (errorUser.value || errorLists.value) {
        _push(`<div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-red-100"><div class="flex items-center space-x-3 md:space-x-4 text-red-600"><div class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-full flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-alert-circle",
          class: "text-red-500 text-xl md:text-2xl"
        }, null, _parent));
        _push(`</div><div><h3 class="font-bold text-base md:text-lg">An Error Occurred</h3><p class="text-red-500 text-sm md:text-base mt-1">${ssrInterpolate(errorUser.value || errorLists.value)}</p></div></div></div>`);
      } else if (user.value) {
        _push(`<div class="space-y-8 animate-fade-in"><div class="relative overflow-hidden bg-darkblue rounded-3xl shadow-2xl"><div class="relative p-6 md:p-8 lg:p-12"><div class="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8"><div class="relative group flex-shrink-0"><div class="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/20 transition-transform duration-300 group-hover:scale-105">`);
        if (user.value.photo) {
          _push(`<img${ssrRenderAttr("src", user.value.photo)} alt="User photo" class="object-cover w-full h-full" loading="lazy">`);
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
        _push(` ${ssrInterpolate(user.value.role)}</span><span class="text-white/80 text-xs md:text-sm font-medium bg-white/10 px-3 py-1 md:px-4 md:py-2 rounded-full backdrop-blur-sm"> User ID: ${ssrInterpolate(user.value.id)}</span></div></div><div class="flex flex-col items-center sm:items-start gap-2 sm:gap-3 lg:mt-3"><button class="px-3 py-2 md:px-4 md:py-2 bg-white/50 rounded-xl text-xs md:text-sm font-medium text-slate-800 hover:bg-white/70 transition"> User Details </button></div></div></div></div><div class="grid grid-cols-1 gap-6"><div class="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/60 p-4 md:p-6 lg:p-8 transition-all duration-300 hover:bg-white/90 hover:border-slate-300/60 hover:shadow-lg"><div class="flex items-center mb-4 md:mb-6"><div class="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-blue-100 text-darkblue mr-3">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-book-open",
          class: "text-xl md:text-2xl"
        }, null, _parent));
        _push(`</div><h2 class="text-lg md:text-xl font-semibold text-slate-900"> All Borrow Lists </h2></div><div class="h-0.5 w-12 md:w-16 bg-gradient-to-r from-blue-500 to-transparent mb-4 md:mb-6"></div><div class="flex gap-3 mb-6"><button class="${ssrRenderClass([
          "px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200",
          filterStatus.value === "borrowed" ? "bg-darkblue text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        ])}"> Borrowed </button><button class="${ssrRenderClass([
          "px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200",
          filterStatus.value === "returned" ? "bg-darkblue text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        ])}"> Returned </button></div>`);
        if (filteredLists.value.length) {
          _push(`<div class="space-y-4 md:space-y-6"><!--[-->`);
          ssrRenderList(filteredLists.value, (list) => {
            _push(`<div class="flex flex-col bg-white rounded-2xl border-l-4 p-3 md:p-4 lg:p-5 shadow-sm border-blue-400 transition-colors duration-200 hover:bg-blue-50"><div class="flex justify-end items-center mb-2"><span class="${ssrRenderClass([list.status === "returned" ? "bg-green-500" : "bg-yellow-500", "text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full text-white"])}">${ssrInterpolate(list.status)}</span></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm text-slate-700 mb-3"><div class="space-y-1"><p class="font-medium">Loan Date:</p><p>${ssrInterpolate(formatDateEnglish(list.loanDate))}</p></div><div class="space-y-1"><p class="font-medium">Due Date:</p><p>${ssrInterpolate(formatDateEnglish(list.dueDate))}</p></div>`);
            if (list.returnedDate) {
              _push(`<div class="space-y-1"><p class="font-medium">Returned On:</p><p>${ssrInterpolate(formatDateEnglish(list.returnedDate))}</p></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="space-y-1"><p class="font-medium">Fine:</p><p>${ssrInterpolate(list.fine ? list.fine.toLocaleString() : "0")} THB</p></div></div>`);
            if (list.listBooks.length) {
              _push(`<div class="mt-2"><p class="text-xs md:text-sm text-slate-800 font-medium mb-2">Books in this list:</p><div class="flex flex-wrap gap-2"><!--[-->`);
              ssrRenderList(list.listBooks, (lb) => {
                _push(ssrRenderComponent(_component_router_link, {
                  to: `/books/${lb.book.id}`,
                  key: lb.id,
                  class: "bg-blue-100 text-darkblue text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full transition-colors duration-200 hover:bg-blue-200"
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`${ssrInterpolate(lb.book.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(lb.book.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
              });
              _push(`<!--]--></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="text-slate-500 italic text-sm md:text-base"> No ${ssrInterpolate(filterStatus.value)} lists found. </div>`);
        }
        if (errorLists.value) {
          _push(`<div class="mt-3 text-red-500 text-xs md:text-sm"> Error: ${ssrInterpolate(errorLists.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profileDetail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DyEXPpfw.mjs.map
