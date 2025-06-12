import { _ as _sfc_main$1 } from './Icon-DGs3lips.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from 'vue/server-renderer';
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
    const bookId = Number(route.params.id);
    const book = ref(null);
    const favorites = ref([]);
    const loading = ref(false);
    const error = ref("");
    const isFavorited = computed(
      () => favorites.value.some((fav) => fav.bookId === bookId)
    );
    computed(() => {
      const fav = favorites.value.find((fav2) => fav2.bookId === bookId);
      return fav ? fav.id : null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" }, _attrs))}>`);
      _push(ssrRenderComponent(AppSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6 pt-3">`);
      if (loading.value) {
        _push(`<div class="flex items-center justify-center h-full"><div class="flex flex-col items-center space-y-4 text-gray-600"><div class="relative">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-loader-2",
          class: "animate-spin text-4xl text-blue-500"
        }, null, _parent));
        _push(`<div class="absolute inset-0 bg-blue-100 rounded-full animate-pulse opacity-30"></div></div><span class="text-lg font-medium">Loading book details...</span></div></div>`);
      } else if (error.value) {
        _push(`<div class="max-w-2xl mx-auto"><div class="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 shadow-lg"><div class="flex items-center space-x-3 text-red-700"><div class="p-2 bg-red-100 rounded-full">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-alert-circle",
          class: "text-xl"
        }, null, _parent));
        _push(`</div><div><h3 class="font-semibold">Oops! Something went wrong</h3><p class="text-sm">${ssrInterpolate(error.value)}</p></div></div></div></div>`);
      } else if (book.value) {
        _push(`<div class="max-w-6xl mx-auto pt-3"><div class="bg-white rounded-2xl shadow-xl overflow-hidden"><div class="relative bg-darkblue p-8 text-white"><div class="absolute inset-0 bg-black opacity-10"></div><div class="relative z-10"><h1 class="text-2xl font-bold mb-2">${ssrInterpolate(book.value.name)}</h1><p class="text-lg opacity-90">by ${ssrInterpolate(book.value.author)}</p></div></div><div class="lg:flex a"><div class="lg:w-2/5 bg-gradient-to-br from-gray-50 to-blue-50 flex items-start justify-center p-8 lg:pt-15"><div class="relative group">`);
        if (book.value.photo) {
          _push(`<img${ssrRenderAttr("src", book.value.photo)}${ssrRenderAttr("alt", book.value.name)} class="object-cover w-80 h-96 rounded-xl shadow-2xl transition-transform duration-300" loading="lazy">`);
        } else {
          _push(`<div class="w-80 h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-2xl flex flex-col items-center justify-center text-gray-500">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-book-open",
            class: "text-8xl mb-4 opacity-50"
          }, null, _parent));
          _push(`<p class="text-lg font-medium">No Image Available</p></div>`);
        }
        _push(`<div class="absolute -top-3 -right-3"><div class="${ssrRenderClass([
          book.value.availableCopies > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white",
          "px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
        ])}">${ssrInterpolate(book.value.availableCopies > 0 ? "Available" : "Out of Stock")}</div></div></div></div><div class="lg:w-3/5 p-8"><div class="space-y-6"><div class="grid grid-cols-2 gap-4"><div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"><div class="flex items-center space-x-2 text-gray-600 mb-1">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-hash",
          class: "text-lg"
        }, null, _parent));
        _push(`<span class="text-sm font-medium">ISBN</span></div><p class="font-semibold text-gray-900">${ssrInterpolate(book.value.isbn)}</p></div><div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"><div class="flex items-center space-x-2 text-gray-600 mb-1">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-file-text",
          class: "text-lg"
        }, null, _parent));
        _push(`<span class="text-sm font-medium">Pages</span></div><p class="font-semibold text-gray-900">${ssrInterpolate(book.value.page)} pages </p></div><div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"><div class="flex items-center space-x-2 text-gray-600 mb-1">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-wallet",
          class: "text-lg"
        }, null, _parent));
        _push(`<span class="text-sm font-medium">Price</span></div><p class="text-gray-900">${ssrInterpolate(book.value.price)}</p></div><div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"><div class="flex items-center space-x-2 text-gray-600 mb-1">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-copy",
          class: "text-lg"
        }, null, _parent));
        _push(`<span class="text-sm font-medium">Copies</span></div><p class="font-semibold"><span class="${ssrRenderClass([
          book.value.availableCopies > 0 ? "text-green-600" : "text-red-600",
          "font-bold text-xl"
        ])}">${ssrInterpolate(book.value.availableCopies)}</span><span class="text-gray-500 font-bold text-xl"> / ${ssrInterpolate(book.value.totalCopies)}</span></p></div><div class="flex"><button${ssrIncludeBooleanAttr(_ctx.favLoading) ? " disabled" : ""} class="${ssrRenderClass([
          "flex items-center space-x-2 px-4 py-2 rounded-xl shadow hover:shadow-md transition text-white focus:outline-none disabled:opacity-50 disabled:cursor-wait",
          isFavorited.value ? "bg-red-500" : "bg-gray-400"
        ])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: isFavorited.value ? "i-lucide-heart-off" : "i-lucide-heart",
          class: "text-lg"
        }, null, _parent));
        _push(`<span class="font-medium">${ssrInterpolate(isFavorited.value ? "Remove Favorite" : "Add to Favorite")}</span></button></div></div><div class="md:flex bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl py-3 px-5"><div class="flex items-center space-x-2 mb-3 md:mb-0">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-tag",
          class: "text-xl text-blue-600"
        }, null, _parent));
        _push(`<h3 class="text-md font-semibold text-gray-900"> Categories </h3></div><div class="flex flex-wrap gap-3 ps-3"><!--[-->`);
        ssrRenderList(book.value.categories, (cat) => {
          _push(`<span class="inline-flex items-center px-2 py-1 bg-white text-blue-700 rounded-full text-sm font-medium shadow-sm transition-shadow">${ssrInterpolate(cat.name)}</span>`);
        });
        _push(`<!--]-->`);
        if (book.value.categories.length === 0) {
          _push(`<span class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm"> Uncategorized </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6"><div class="flex items-center space-x-2 mb-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-file-text",
          class: "text-xl text-purple-600"
        }, null, _parent));
        _push(`<h3 class="text-lg font-semibold text-gray-900"> Description </h3></div><div class="prose prose-gray max-w-none"><p class="text-gray-700 leading-relaxed whitespace-pre-line">${ssrInterpolate(book.value.detail || "No description available for this book.")}</p></div></div></div></div></div></div></div>`);
      } else {
        _push(`<div class="text-center py-20"><div class="max-w-md mx-auto">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-book-x",
          class: "text-6xl text-gray-400 mx-auto mb-4"
        }, null, _parent));
        _push(`<h2 class="text-2xl font-semibold text-gray-900 mb-2"> Book Not Found </h2><p class="text-gray-600"> The book you&#39;re looking for doesn&#39;t exist or has been removed. </p></div></div>`);
      }
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/books/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CYGjyPpi.mjs.map
