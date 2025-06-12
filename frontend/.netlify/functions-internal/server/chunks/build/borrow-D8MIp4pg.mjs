import { _ as _sfc_main$1 } from './Icon-DGs3lips.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
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
  __name: "borrow",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const books = ref([]);
    const loading = ref(false);
    const error = ref("");
    const searchQuery = ref("");
    const form = ref({
      userId: null,
      dueDate: "",
      bookIds: []
    });
    const showSuccess = ref(false);
    const filteredBooks = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      if (!q) return books.value;
      return books.value.filter((b) => b.name.toLowerCase().includes(q));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen bg-gray-50" }, _attrs))}>`);
      _push(ssrRenderComponent(AppSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6"><div class="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto"><div class="mb-6"><h1 class="text-2xl font-bold text-gray-800">Create Loan</h1><p class="text-gray-600 mt-1">Search, select books, and assign to a user</p></div><form class="space-y-6"><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="userId" class="block text-sm font-medium text-gray-700 mb-1">User ID</label><input${ssrRenderAttr("value", form.value.userId)} type="number" id="userId" placeholder="Enter user ID" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700"></div><div><label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">Due Date</label><input${ssrRenderAttr("value", form.value.dueDate)} type="date" id="dueDate" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700"></div></div><div class="relative w-full max-w-md">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-search",
        class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search books..." class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700"></div><div class="overflow-x-auto"><table class="min-w-full bg-white divide-y divide-gray-200 rounded-lg shadow-sm"><thead class="bg-gray-50"><tr><th class="w-10 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Select</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Author</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Available</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
      ssrRenderList(filteredBooks.value, (book) => {
        _push(`<tr class="hover:bg-gray-50 transition-colors"><td class="px-3 py-2"><label class="inline-flex items-center cursor-pointer group"><input type="checkbox"${ssrRenderAttr("value", book.id)}${ssrIncludeBooleanAttr(Array.isArray(form.value.bookIds) ? ssrLooseContain(form.value.bookIds, book.id) : form.value.bookIds) ? " checked" : ""} class="sr-only"><div class="relative"><div class="${ssrRenderClass([form.value.bookIds.includes(book.id) ? "bg-darkblue shadow-md" : "bg-white border-gray-300 group-hover:border-indigo-400", "w-6 h-6 border-2 rounded-md transition-all duration-300 ease-in-out group-hover:shadow-sm flex items-center justify-center"])}"><svg class="${ssrRenderClass([form.value.bookIds.includes(book.id) ? "text-white scale-100" : "text-transparent scale-0", "w-4 h-4 transition-all duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div></div></label></td><td class="px-4 py-2 text-sm text-gray-800">${ssrInterpolate(book.name)}</td><td class="px-4 py-2 text-sm text-gray-800">${ssrInterpolate(book.author)}</td><td class="px-4 py-2 text-sm text-gray-800">${ssrInterpolate(book.availableCopies)}</td></tr>`);
      });
      _push(`<!--]-->`);
      if (filteredBooks.value.length === 0) {
        _push(`<tr><td colspan="4" class="px-4 py-6 text-center text-gray-500"> No books found or no copies available </td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div>`);
      if (error.value) {
        _push(`<div class="text-red-500 text-sm">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-end"><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="flex items-center gap-2 bg-darkblue text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-book-open",
        class: "text-lg"
      }, null, _parent));
      if (!loading.value) {
        _push(`<span>Borrow</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></form></div></main>`);
      if (showSuccess.value) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div class="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center space-y-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-check-circle",
          class: "text-5xl text-green-500 mx-auto"
        }, null, _parent));
        _push(`<h2 class="text-xl font-semibold text-gray-800">Loan created successfully!</h2><button class="mt-4 bg-green-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-700 transition"> OK </button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/borrow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=borrow-D8MIp4pg.mjs.map
