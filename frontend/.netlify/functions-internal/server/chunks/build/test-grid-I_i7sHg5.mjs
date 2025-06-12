import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "test-grid",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4" }, _attrs))} data-v-567fabe8><h2 class="mb-4 text-lg font-semibold" data-v-567fabe8>\u0E17\u0E14\u0E2A\u0E2D\u0E1A Grid \u2013 \u0E22\u0E48\u0E2D/\u0E02\u0E22\u0E32\u0E22\u0E14\u0E39</h2><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 bg-gray-100 p-2" data-v-567fabe8><!--[-->`);
      ssrRenderList(12, (n) => {
        _push(`<div class="h-20 bg-indigo-500 text-green-500 flex items-center justify-center text-sm" data-v-567fabe8> Box ${ssrInterpolate(n)}</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test-grid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const testGrid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-567fabe8"]]);

export { testGrid as default };
//# sourceMappingURL=test-grid-I_i7sHg5.mjs.map
