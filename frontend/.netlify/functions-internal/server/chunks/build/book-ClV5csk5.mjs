import { _ as _sfc_main$1 } from './Icon-DGs3lips.mjs';
import { ref, computed, resolveComponent, mergeProps, withCtx, createVNode, createBlock, openBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { A as AppSidebar } from './AppSidebar-BuO0Enkh.mjs';
import { _ as _export_sfc } from './server.mjs';
import './index-BirsLqLi.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'reka-ui';
import '@vueuse/core';
import 'vue-router';
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

const _sfc_main = {
  __name: "book",
  __ssrInlineRender: true,
  setup(__props) {
    const books = ref([]);
    const categories = ref([]);
    const searchQuery = ref("");
    const category = ref(0);
    function findCategoryName(catId) {
      const found = categories.value.find((c) => c.id === catId);
      return found ? found.name : "";
    }
    const displayedBooks = computed(() => {
      let filtered = books.value;
      if (searchQuery.value) {
        const qLower = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (b) => b.name.toLowerCase().includes(qLower)
        );
      }
      if (category.value !== 0) {
        filtered = filtered.filter((book2) => {
          return Array.isArray(book2.categories) && book2.categories.some((cItem) => cItem.categoryId === category.value);
        });
      }
      return filtered;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen bg-gray-50" }, _attrs))} data-v-3bc781a2>`);
      _push(ssrRenderComponent(AppSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-4 sm:p-6 lg:p-8" data-v-3bc781a2><div class="mb-6 px-2 sm:px-0" data-v-3bc781a2><h1 class="text-2xl sm:text-3xl font-bold text-gray-900 ms-10" data-v-3bc781a2>Book Management</h1><p class="text-gray-600 mt-1 text-sm sm:text-base ms-10" data-v-3bc781a2> Browse and manage all books in the library </p></div><div class="mb-6 px-2 sm:px-0" data-v-3bc781a2><div class="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4" data-v-3bc781a2><div class="w-full sm:w-1/2 lg:w-1/3" data-v-3bc781a2><div class="relative" data-v-3bc781a2>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-search",
        class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search by name..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700 bg-white text-sm" data-v-3bc781a2></div></div><div class="w-full sm:w-1/3 lg:w-1/4" data-v-3bc781a2><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white text-gray-700 text-sm" data-v-3bc781a2><option${ssrRenderAttr("value", 0)} data-v-3bc781a2${ssrIncludeBooleanAttr(Array.isArray(category.value) ? ssrLooseContain(category.value, 0) : ssrLooseEqual(category.value, 0)) ? " selected" : ""}>All Categories</option><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(`<option${ssrRenderAttr("value", cat.id)} data-v-3bc781a2${ssrIncludeBooleanAttr(Array.isArray(category.value) ? ssrLooseContain(category.value, cat.id) : ssrLooseEqual(category.value, cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
      });
      _push(`<!--]--></select></div></div></div>`);
      if (displayedBooks.value.length > 0) {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-2 sm:px-0" data-v-3bc781a2><!--[-->`);
        ssrRenderList(displayedBooks.value, (book2) => {
          _push(ssrRenderComponent(_component_router_link, {
            key: book2.id,
            to: `/books/${book2.id}`,
            class: "bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 group"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="aspect-[3/4] bg-gray-100 flex items-center justify-center relative" data-v-3bc781a2${_scopeId}>`);
                if (book2.photo) {
                  _push2(`<img${ssrRenderAttr("src", book2.photo)}${ssrRenderAttr("alt", book2.name)} class="w-full h-full object-cover" loading="lazy" data-v-3bc781a2${_scopeId}>`);
                } else {
                  _push2(`<div class="flex flex-col items-center text-gray-400" data-v-3bc781a2${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-book-open",
                    class: "text-2xl mb-1"
                  }, null, _parent2, _scopeId));
                  _push2(`<p class="text-xs text-gray-500" data-v-3bc781a2${_scopeId}>No Image</p></div>`);
                }
                _push2(`<span class="${ssrRenderClass([book2.availableCopies > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "absolute top-2 right-2 inline-flex px-2 text-[10px] font-medium py-0.5 rounded-full"])}" data-v-3bc781a2${_scopeId}>${ssrInterpolate(book2.availableCopies > 0 ? "Available" : "Out")}</span></div><div class="p-2" data-v-3bc781a2${_scopeId}><h3 class="font-semibold text-gray-900 text-sm line-clamp-1 mb-1"${ssrRenderAttr("title", book2.name)} data-v-3bc781a2${_scopeId}>${ssrInterpolate(book2.name)}</h3><p class="text-[10px] sm:text-xs text-gray-500 line-clamp-1 mb-1"${ssrRenderAttr("title", book2.author)} data-v-3bc781a2${_scopeId}>${ssrInterpolate(book2.author)}</p><div class="flex flex-wrap gap-1" data-v-3bc781a2${_scopeId}><!--[-->`);
                ssrRenderList(book2.categories || [], (catItem) => {
                  _push2(`<span class="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[8px] font-medium rounded-full" data-v-3bc781a2${_scopeId}>${ssrInterpolate(findCategoryName(catItem.categoryId))}</span>`);
                });
                _push2(`<!--]-->`);
                if (!book2.categories || book2.categories.length === 0) {
                  _push2(`<span class="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[8px] font-medium rounded-full" data-v-3bc781a2${_scopeId}> Uncategorized </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "aspect-[3/4] bg-gray-100 flex items-center justify-center relative" }, [
                    book2.photo ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: book2.photo,
                      alt: book2.name,
                      class: "w-full h-full object-cover",
                      loading: "lazy"
                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex flex-col items-center text-gray-400"
                    }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-book-open",
                        class: "text-2xl mb-1"
                      }),
                      createVNode("p", { class: "text-xs text-gray-500" }, "No Image")
                    ])),
                    createVNode("span", {
                      class: ["absolute top-2 right-2 inline-flex px-2 text-[10px] font-medium py-0.5 rounded-full", book2.availableCopies > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"]
                    }, toDisplayString(book2.availableCopies > 0 ? "Available" : "Out"), 3)
                  ]),
                  createVNode("div", { class: "p-2" }, [
                    createVNode("h3", {
                      class: "font-semibold text-gray-900 text-sm line-clamp-1 mb-1",
                      title: book2.name
                    }, toDisplayString(book2.name), 9, ["title"]),
                    createVNode("p", {
                      class: "text-[10px] sm:text-xs text-gray-500 line-clamp-1 mb-1",
                      title: book2.author
                    }, toDisplayString(book2.author), 9, ["title"]),
                    createVNode("div", { class: "flex flex-wrap gap-1" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(book2.categories || [], (catItem) => {
                        var _a;
                        return openBlock(), createBlock("span", {
                          key: (_a = catItem.id) != null ? _a : catItem.categoryId,
                          class: "px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[8px] font-medium rounded-full"
                        }, toDisplayString(findCategoryName(catItem.categoryId)), 1);
                      }), 128)),
                      !book2.categories || book2.categories.length === 0 ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[8px] font-medium rounded-full"
                      }, " Uncategorized ")) : createCommentVNode("", true)
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-12 px-2 sm:px-0" data-v-3bc781a2>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-book",
          class: "text-gray-400 text-4xl sm:text-5xl mb-3"
        }, null, _parent));
        _push(`<h3 class="text-sm sm:text-base font-medium text-gray-900 mb-2" data-v-3bc781a2>No books found</h3><p class="text-gray-500 text-xs sm:text-sm" data-v-3bc781a2>Add your first book to the library.</p></div>`);
      }
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/book.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const book = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3bc781a2"]]);

export { book as default };
//# sourceMappingURL=book-ClV5csk5.mjs.map
