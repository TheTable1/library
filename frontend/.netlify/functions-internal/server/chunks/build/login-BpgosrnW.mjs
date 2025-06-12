import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-DCtKI8r_.mjs';
import { useRouter } from 'vue-router';
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

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "min-h-screen flex items-center justify-center bg-cover bg-center relative",
        style: { "background-image": "url('/images/background.jpg')" }
      }, _attrs))}><div class="absolute inset-0 bg-gray-900/30"></div><div class="relative bg-white backdrop-blur-sm rounded-xl shadow-2xl p-10 max-w-md w-full"><button class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition cp" aria-label="Go Back"><img${ssrRenderAttr("src", _imports_0)} alt="Cancel" class="w-6 h-6"></button><div class="flex justify-center mb-6"><svg class="w-16 h-16 text-darkblue" fill="currentColor" viewBox="0 0 24 24"><path d="M4 19H20V5H4V19ZM6 7H18V17H6V7ZM8 9H10V15H8V9ZM12 9H14V15H12V9Z"></path></svg></div><h1 class="text-3xl font-extrabold text-center text-darkblue">Login</h1><form class="space-y-6"><div><label for="email" class="block text-sm font-medium text-gray-700 mb-1"> Email </label><input${ssrRenderAttr("value", email.value)} type="email" id="email" required placeholder="Enter Your Email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-400"></div><div><label for="password" class="block text-sm font-medium text-gray-700 mb-1"> Password </label><input${ssrRenderAttr("value", password.value)} type="password" id="password" required placeholder="Enter Your Password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-400"></div>`);
      if (error.value) {
        _push(`<div class="text-red-500 text-sm">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="mb-2 cp w-full flex items-center justify-center gap-2 bg-darkblue text-white font-semibold py-3 rounded-lg transition disabled:opacity-50">`);
      if (!loading.value) {
        _push(`<span>Sign In</span>`);
      } else {
        _push(`<span class="loader"></span>`);
      }
      _push(`</button><p class="text-gray-400 mt-3"> If you don\u2019t have an account, please `);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/register",
        class: "text-darkblue font-bold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Register`);
          } else {
            return [
              createTextVNode("Register")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p class="text-sm text-gray-600 text-center"> \xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Library System </p></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-BpgosrnW.mjs.map
