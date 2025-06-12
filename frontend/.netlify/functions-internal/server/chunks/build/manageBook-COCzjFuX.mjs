import { _ as _sfc_main$1 } from './Icon-DGs3lips.mjs';
import { _ as _sfc_main$2 } from './Button-DyIBUF5Z.mjs';
import { ref, computed, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
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
import 'tailwind-variants';
import './nuxt-link-CVxP-D7F.mjs';

const _sfc_main = {
  __name: "manageBook",
  __ssrInlineRender: true,
  setup(__props) {
    const books = ref([]);
    const allCategories = ref([]);
    const loading = ref(false);
    const error = ref("");
    const searchQuery = ref("");
    const sortKey = ref("");
    const sortAsc = ref(true);
    const showEdit = ref(false);
    const editForm = ref({
      id: null,
      name: "",
      author: "",
      isbn: "",
      totalCopies: 0,
      availableCopies: 0,
      page: 0,
      price: 0,
      photo: "",
      detail: "",
      categoryIds: []
    });
    const router = useRouter();
    function getToken() {
      return localStorage.getItem("token") || "";
    }
    async function fetchBooks() {
      var _a;
      loading.value = true;
      error.value = "";
      try {
        const res = await $fetch("/books", {
          baseURL: "http://localhost:3000",
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        books.value = res.data;
      } catch (e) {
        error.value = ((_a = e.data) == null ? void 0 : _a.message) || e.message || "Failed to load books";
      } finally {
        loading.value = false;
      }
    }
    function viewBook(b) {
      router.push(`/books/${b.id}`);
    }
    function openEdit(b) {
      editForm.value = {
        id: b.id,
        name: b.name || "",
        author: b.author || "",
        isbn: b.isbn || "",
        totalCopies: b.totalCopies,
        availableCopies: b.availableCopies,
        page: b.page,
        price: b.price,
        photo: b.photo || "",
        detail: b.detail || "",
        categoryIds: b.categories.map((c) => c.categoryId)
      };
      showEdit.value = true;
    }
    function openCreate() {
      editForm.value = {
        id: null,
        name: "",
        author: "",
        isbn: "",
        totalCopies: 0,
        availableCopies: 0,
        page: 0,
        price: 0,
        photo: "",
        detail: "",
        categoryIds: []
      };
      showEdit.value = true;
    }
    async function deleteBook(b) {
      var _a;
      if (!confirm(`Delete "${b.name}"?`)) return;
      try {
        await $fetch(`/books/${b.id}`, {
          method: "DELETE",
          baseURL: "http://localhost:3000",
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        await fetchBooks();
      } catch (e) {
        error.value = ((_a = e.data) == null ? void 0 : _a.message) || e.message;
      }
    }
    const displayedBooks = computed(() => {
      let list = books.value.slice();
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        list = list.filter((b) => b.name.toLowerCase().includes(q));
      }
      if (sortKey.value) {
        list.sort((a, b) => {
          var _a, _b;
          let va = (_a = a[sortKey.value]) != null ? _a : "";
          let vb = (_b = b[sortKey.value]) != null ? _b : "";
          if (typeof va === "string") va = va.toLowerCase();
          if (typeof vb === "string") vb = vb.toLowerCase();
          if (va < vb) return sortAsc.value ? -1 : 1;
          if (va > vb) return sortAsc.value ? 1 : -1;
          return 0;
        });
      }
      return list;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_UButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(AppSidebar, null, null, _parent));
      _push(`<main class="flex-1 bg-gray-50 p-6"><div class="w-full bg-white shadow-sm rounded-lg p-6"><div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"><div><h1 class="text-3xl font-bold text-gray-900">Book Management</h1><p class="text-gray-600 mt-1">Browse and manage all books in the library</p></div><div class="mt-4 sm:mt-0 flex space-x-2"><div class="relative mt-5">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-search",
        class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-darkblue"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search by title..." class="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-200 border-gray-300 text-darkblue"></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: openCreate,
        variant: "primary",
        class: "px-4 py-2 flex items-center space-x-2 cp bg-darkblue mt-5 text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, { name: "i-lucide-book-plus" }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Add Book</span>`);
          } else {
            return [
              createVNode(_component_UIcon, { name: "i-lucide-book-plus" }),
              createVNode("span", null, "Add Book")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (loading.value) {
        _push(`<div class="flex items-center justify-center py-12"><div class="flex items-center space-x-2 text-gray-600">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-loader-2",
          class: "animate-spin"
        }, null, _parent));
        _push(`<span>Loading books...</span></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"><div class="flex items-center space-x-2 text-red-700">`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-alert-circle" }, null, _parent));
        _push(`<span>${ssrInterpolate(error.value)}</span></div></div>`);
      } else {
        _push(`<div class="overflow-x-auto"><table class="table-fixed w-full divide-y divide-gray-200 bg-white shadow rounded-lg"><thead class="bg-gray-50"><tr><th class="w-12 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">No.</th><th class="w-15 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"> ID `);
        if (sortKey.value === "id") {
          _push(ssrRenderComponent(_component_UIcon, {
            name: sortAsc.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
            class: "inline-block ml-1 text-xs"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"> Title `);
        if (sortKey.value === "name") {
          _push(ssrRenderComponent(_component_UIcon, {
            name: sortAsc.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
            class: "inline-block ml-1 text-xs"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</th><th class="w-40 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"> Author `);
        if (sortKey.value === "author") {
          _push(ssrRenderComponent(_component_UIcon, {
            name: sortAsc.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
            class: "inline-block ml-1 text-xs"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</th><th class="w-35 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">ISBN</th><th class="w-15 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th><th class="w-15 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Avail.</th><th class="w-24 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"> Price `);
        if (sortKey.value === "price") {
          _push(ssrRenderComponent(_component_UIcon, {
            name: sortAsc.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
            class: "inline-block ml-1 text-xs"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</th><th class="w-32 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
        ssrRenderList(displayedBooks.value, (b, i) => {
          _push(`<tr><td class="px-3 py-2 text-sm text-gray-900">${ssrInterpolate(i + 1)}</td><td class="px-3 py-2 text-sm text-gray-900">${ssrInterpolate(b.id)}</td><td class="px-3 py-2 text-sm text-gray-900">${ssrInterpolate(b.name)}</td><td class="px-3 py-2 text-sm text-gray-900">${ssrInterpolate(b.author)}</td><td class="px-3 py-2 text-sm text-gray-900">${ssrInterpolate(b.isbn)}</td><td class="px-3 py-2 text-sm text-gray-900">${ssrInterpolate(b.totalCopies)}</td><td class="px-3 py-2 text-sm text-gray-900">${ssrInterpolate(b.availableCopies)}</td><td class="px-3 py-2 text-sm text-gray-900">\u0E3F ${ssrInterpolate(b.price)}</td><td class="px-3 py-2 text-sm"><div class="flex items-center space-x-2 text-green-500">`);
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            class: "cp hover:bg-green-100",
            size: "sm",
            icon: "i-lucide-eye",
            onClick: ($event) => viewBook(b)
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            class: "cp hover:bg-green-100",
            size: "sm",
            icon: "i-lucide-edit",
            onClick: ($event) => openEdit(b)
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            class: "cp hover:bg-green-100",
            size: "sm",
            icon: "i-lucide-trash",
            onClick: ($event) => deleteBook(b)
          }, null, _parent));
          _push(`</div></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
        if (displayedBooks.value.length === 0) {
          _push(`<div class="text-center py-12">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-book",
            class: "text-gray-400 text-4xl mb-4"
          }, null, _parent));
          _push(`<h3 class="text-lg font-medium text-gray-900 mb-2">No books found</h3><p class="text-gray-500">Try adjusting search or add a new book.</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></main>`);
      if (showEdit.value) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"><div class="bg-darkblue text-white px-6 py-4 flex justify-between items-center"><h3 class="text-xl font-semibold">${ssrInterpolate(editForm.value.id ? "Edit Book" : "Add New Book")}</h3><button class="text-white text-2xl cp">`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-x" }, null, _parent));
        _push(`</button></div><div class="p-6 text-black max-h-[80vh] overflow-y-auto"><form class="space-y-5"><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Title</label><input${ssrRenderAttr("value", editForm.value.name)} type="text" class="w-full border rounded-lg px-4 py-2" required></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Author</label><input${ssrRenderAttr("value", editForm.value.author)} type="text" class="w-full border rounded-lg px-4 py-2" required></div></div><div><label class="block text-sm font-medium text-gray-700 mb-1">ISBN</label><input${ssrRenderAttr("value", editForm.value.isbn)} type="text" class="w-full border rounded-lg px-4 py-2" required></div><div class="grid grid-cols-3 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Total Copies</label><input${ssrRenderAttr("value", editForm.value.totalCopies)} type="number" class="w-full border rounded-lg px-4 py-2" required></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Available</label><input${ssrRenderAttr("value", editForm.value.availableCopies)} type="number" class="w-full border rounded-lg px-4 py-2" required></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Pages</label><input${ssrRenderAttr("value", editForm.value.page)} type="number" class="w-full border rounded-lg px-4 py-2" required></div></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Price</label><input${ssrRenderAttr("value", editForm.value.price)} type="number" step="0.01" class="w-full border rounded-lg px-4 py-2" required></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Photo URL</label><input${ssrRenderAttr("value", editForm.value.photo)} type="text" class="w-full border rounded-lg px-4 py-2" required></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea rows="3" class="w-full border rounded-lg px-4 py-2 resize-none" required>${ssrInterpolate(editForm.value.detail)}</textarea></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Categories</label><div class="grid grid-cols-2 gap-2"><!--[-->`);
        ssrRenderList(allCategories.value, (cat) => {
          _push(`<label class="inline-flex items-center px-3 py-1 border rounded-lg cursor-pointer"><input type="checkbox"${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(editForm.value.categoryIds) ? ssrLooseContain(editForm.value.categoryIds, cat.id) : editForm.value.categoryIds) ? " checked" : ""} class="mr-2"> ${ssrInterpolate(cat.name)}</label>`);
        });
        _push(`<!--]--></div></div><div class="flex justify-end space-x-3 pt-4 border-t border-gray-200"><button type="button" class="px-4 py-2 border rounded-lg cp"> Cancel </button><button type="submit" class="px-4 py-2 bg-darkblue text-white rounded-lg cp"> Save Changes </button></div></form></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manageBook.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=manageBook-COCzjFuX.mjs.map
