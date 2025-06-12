import { _ as _sfc_main$1 } from './Icon-DGs3lips.mjs';
import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-DCtKI8r_.mjs';
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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const phone = ref("");
    const address = ref("");
    const error = ref("");
    const loading = ref(false);
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "min-h-screen flex items-center justify-center bg-cover bg-center relative",
        style: { "background-image": "url('/images/background.jpg')" }
      }, _attrs))}><div class="absolute inset-0 bg-gray-900/30"></div><div class="relative bg-white backdrop-blur-sm rounded-xl shadow-2xl p-6 max-w-md w-full"><button class="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition cp" aria-label="Go Back"><img${ssrRenderAttr("src", _imports_0)} alt="Cancel" class="w-5 h-5"></button><h1 class="text-2xl font-extrabold text-center text-darkblue mb-4"> Register </h1><form class="space-y-4"><div><label for="firstName" class="block text-xs font-medium text-gray-700 mb-1"> First Name </label><input${ssrRenderAttr("value", firstName.value)} type="text" id="firstName" required placeholder="First Name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm"></div><div><label for="lastName" class="block text-xs font-medium text-gray-700 mb-1"> Last Name </label><input${ssrRenderAttr("value", lastName.value)} type="text" id="lastName" required placeholder="Last Name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm"></div><div><label for="email" class="block text-xs font-medium text-gray-700 mb-1"> Email </label><input${ssrRenderAttr("value", email.value)} type="email" id="email" required placeholder="Email Address" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm"></div><div><label for="password" class="block text-xs font-medium text-gray-700 mb-1"> Password </label><input${ssrRenderAttr("value", password.value)} type="password" id="password" required placeholder="Password" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm"></div><div><label for="confirmPassword" class="block text-xs font-medium text-gray-700 mb-1"> Confirm Password </label><input${ssrRenderAttr("value", confirmPassword.value)} type="password" id="confirmPassword" required placeholder="Confirm Password" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm"></div><div><label for="phone" class="block text-xs font-medium text-gray-700 mb-1"> Phone </label><input${ssrRenderAttr("value", phone.value)} type="text" id="phone" required placeholder="Phone Number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm"></div><div><label for="address" class="block text-xs font-medium text-gray-700 mb-1"> Address </label><textarea id="address" required rows="2" placeholder="Address" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm resize-none">${ssrInterpolate(address.value)}</textarea></div>`);
      if (error.value) {
        _push(`<div class="text-red-500 text-xs">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full flex items-center justify-center gap-1 bg-darkblue text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 text-sm">`);
      if (!loading.value) {
        _push(`<span>Sign Up</span>`);
      } else {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-loader-2",
          class: "animate-spin text-base"
        }, null, _parent));
      }
      _push(`</button><p class="text-gray-400 text-xs text-center"> Already have an account? `);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/login",
        class: "text-darkblue font-bold text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Login `);
          } else {
            return [
              createTextVNode(" Login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-BVQPhHfp.mjs.map
