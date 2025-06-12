import { _ as __nuxt_component_0 } from './nuxt-link-CVxP-D7F.mjs';
import { mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "min-h-screen flex items-center justify-center bg-cover bg-center relative",
    style: { "background-image": "url('/images/background.jpg')" }
  }, _attrs))}><div class="absolute inset-0 bg-gray-900/30"></div><div class="relative z-10 text-center space-y-6 bg-white px-10 py-15 rounded-lg"><h1 class="text-4xl text-darkblue font-extrabold mb-24"> Welcome to the Library System </h1>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<button class="bg-darkblue hover:bg-darkblue-hover text-white px-4 py-2 rounded-lg cp"${_scopeId}> Go to Login </button>`);
      } else {
        return [
          createVNode("button", { class: "bg-darkblue hover:bg-darkblue-hover text-white px-4 py-2 rounded-lg cp" }, " Go to Login ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-4mzd9RUy.mjs.map
