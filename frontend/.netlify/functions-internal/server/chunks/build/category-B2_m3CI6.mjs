import { _ as _sfc_main$1 } from './Icon-DGs3lips.mjs';
import { _ as _sfc_main$2 } from './Button-DyIBUF5Z.mjs';
import { ref, computed, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { A as AppSidebar } from './AppSidebar-BuO0Enkh.mjs';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
import './index-BirsLqLi.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'reka-ui';
import '@vueuse/core';
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
import 'tailwind-variants';
import './nuxt-link-CVxP-D7F.mjs';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  __name: "category",
  __ssrInlineRender: true,
  setup(__props) {
    const categories = ref([]);
    const loading = ref(false);
    const error = ref("");
    const searchQuery = ref("");
    const sortKey = ref("");
    const sortAsc = ref(true);
    const showEdit = ref(false);
    const editForm = ref({
      id: null,
      name: "",
      detail: ""
    });
    useRouter();
    function getToken() {
      return localStorage.getItem("token") || "";
    }
    async function fetchCategories() {
      var _a;
      loading.value = true;
      error.value = "";
      try {
        const res = await $fetch("/category", {
          baseURL: "http://localhost:3000",
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        categories.value = res.data;
      } catch (e) {
        error.value = ((_a = e.data) == null ? void 0 : _a.message) || e.message || "Failed to load categories";
        categories.value = [];
      } finally {
        loading.value = false;
      }
    }
    function openEdit(cat) {
      editForm.value = {
        id: cat.id,
        name: cat.name || "",
        detail: cat.detail || ""
      };
      showEdit.value = true;
    }
    function openCreate() {
      editForm.value = { id: null, name: "", detail: "" };
      showEdit.value = true;
    }
    async function deleteCategory(cat) {
      var _a;
      if (!confirm(`Delete category "${cat.name}"?`)) return;
      try {
        await $fetch(`/category/${cat.id}`, {
          method: "DELETE",
          baseURL: "http://localhost:3000",
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        await fetchCategories();
      } catch (e) {
        error.value = ((_a = e.data) == null ? void 0 : _a.message) || e.message;
      }
    }
    const displayedCategories = computed(() => {
      let list = categories.value.slice();
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        list = list.filter((cat) => cat.name.toLowerCase().includes(q));
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen" }, _attrs))} data-v-90be8d58>`);
      _push(ssrRenderComponent(AppSidebar, null, null, _parent));
      _push(`<main class="flex-1 bg-gray-50 p-6" data-v-90be8d58><div class="w-full bg-white shadow-sm rounded-lg p-6" data-v-90be8d58><div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-90be8d58><div data-v-90be8d58><h1 class="text-3xl font-bold text-gray-900" data-v-90be8d58>Category Management</h1></div><div class="mt-4 sm:mt-0 flex space-x-2" data-v-90be8d58><div class="relative mt-5" data-v-90be8d58>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-search",
        class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-darkblue"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search by category..." class="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-200 border-gray-300 text-darkblue" data-v-90be8d58></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: openCreate,
        variant: "primary",
        class: "px-4 py-2 flex items-center space-x-2 cp bg-darkblue mt-5 text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, { name: "i-lucide-plus-circle" }, null, _parent2, _scopeId));
            _push2(`<span data-v-90be8d58${_scopeId}>Add Category</span>`);
          } else {
            return [
              createVNode(_component_UIcon, { name: "i-lucide-plus-circle" }),
              createVNode("span", null, "Add Category")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (loading.value) {
        _push(`<div class="flex items-center justify-center py-12" data-v-90be8d58><div class="flex items-center space-x-2 text-gray-600" data-v-90be8d58>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-loader-2",
          class: "animate-spin"
        }, null, _parent));
        _push(`<span data-v-90be8d58>Loading categories...</span></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" data-v-90be8d58><div class="flex items-center space-x-2 text-red-700" data-v-90be8d58>`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-alert-circle" }, null, _parent));
        _push(`<span data-v-90be8d58>${ssrInterpolate(error.value)}</span></div></div>`);
      } else {
        _push(`<div class="overflow-x-auto" data-v-90be8d58><table class="min-w-max w-full table-auto divide-y divide-gray-200 bg-white shadow rounded-lg" data-v-90be8d58><thead class="bg-gray-50" data-v-90be8d58><tr data-v-90be8d58><th class="w-12 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase" data-v-90be8d58>No.</th><th class="w-15 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer" data-v-90be8d58> ID `);
        if (sortKey.value === "id") {
          _push(ssrRenderComponent(_component_UIcon, {
            name: sortAsc.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
            class: "inline-block ml-1 text-xs"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer whitespace-nowrap" data-v-90be8d58> Category `);
        if (sortKey.value === "name") {
          _push(ssrRenderComponent(_component_UIcon, {
            name: sortAsc.value ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
            class: "inline-block ml-1 text-xs"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</th><th class="w-35 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap" data-v-90be8d58>Detail</th><th class="w-24 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap" data-v-90be8d58>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-90be8d58><!--[-->`);
        ssrRenderList(displayedCategories.value, (cat, i) => {
          _push(`<tr data-v-90be8d58><td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap" data-v-90be8d58>${ssrInterpolate(i + 1)}</td><td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap" data-v-90be8d58>${ssrInterpolate(cat.id)}</td><td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap" data-v-90be8d58>${ssrInterpolate(cat.name)}</td><td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap" data-v-90be8d58>${ssrInterpolate(cat.detail || "-")}</td><td class="px-3 py-2 text-sm whitespace-nowrap" data-v-90be8d58><div class="flex items-center space-x-2 text-green-500" data-v-90be8d58>`);
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            class: "cp hover:bg-green-100",
            size: "sm",
            icon: "i-lucide-edit",
            onClick: ($event) => openEdit(cat)
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            class: "cp hover:bg-green-100",
            size: "sm",
            icon: "i-lucide-trash",
            onClick: ($event) => deleteCategory(cat)
          }, null, _parent));
          _push(`</div></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
        if (displayedCategories.value.length === 0) {
          _push(`<div class="text-center py-12" data-v-90be8d58>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-tag",
            class: "text-gray-400 text-4xl mb-4"
          }, null, _parent));
          _push(`<h3 class="text-lg font-medium text-gray-900 mb-2" data-v-90be8d58>No categories found</h3><p class="text-gray-500" data-v-90be8d58>Try adjusting search or add a new category.</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></main>`);
      if (showEdit.value) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-v-90be8d58><div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" data-v-90be8d58><div class="bg-darkblue text-white px-6 py-4 flex justify-between items-center" data-v-90be8d58><h3 class="text-xl font-semibold" data-v-90be8d58>${ssrInterpolate(editForm.value.id ? "Edit Category" : "Add New Category")}</h3><button class="text-white text-2xl cp" data-v-90be8d58>`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-x" }, null, _parent));
        _push(`</button></div><div class="p-6 text-black max-h-[80vh] overflow-y-auto" data-v-90be8d58><form class="space-y-5" data-v-90be8d58><div data-v-90be8d58><label class="block text-sm font-medium text-gray-700 mb-1" data-v-90be8d58>Category Name</label><input${ssrRenderAttr("value", editForm.value.name)} type="text" class="w-full border rounded-lg px-4 py-2" required data-v-90be8d58></div><div data-v-90be8d58><label class="block text-sm font-medium text-gray-700 mb-1" data-v-90be8d58>Detail</label><textarea rows="3" class="w-full border rounded-lg px-4 py-2 resize-none" data-v-90be8d58>${ssrInterpolate(editForm.value.detail)}</textarea></div><div class="flex justify-end space-x-3 pt-4 border-t border-gray-200" data-v-90be8d58><button type="button" class="px-4 py-2 border rounded-lg cp" data-v-90be8d58> Cancel </button><button type="submit" class="px-4 py-2 bg-darkblue text-white rounded-lg cp" data-v-90be8d58> Save </button></div></form></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/category.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const category = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-90be8d58"]]);

export { category as default };
//# sourceMappingURL=category-B2_m3CI6.mjs.map
