import { _ as _sfc_main$1 } from './Icon-DGs3lips.mjs';
import { _ as _sfc_main$2 } from './Button-DyIBUF5Z.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { A as AppSidebar } from './AppSidebar-BuO0Enkh.mjs';
import Swal from 'sweetalert2';
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
  __name: "return",
  __ssrInlineRender: true,
  setup(__props) {
    const lists = ref([]);
    const loading = ref(false);
    const error = ref("");
    const router = useRouter();
    const statusFilter = ref("borrowed");
    const filteredLists = computed(
      () => lists.value.filter((list) => list.status === statusFilter.value)
    );
    function formatDate(dateString) {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
    async function fetchLists() {
      var _a;
      loading.value = true;
      error.value = "";
      try {
        const res = await $fetch("/lists", {
          baseURL: "http://localhost:3000",
          headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` }
        });
        lists.value = res.data;
      } catch (e) {
        error.value = ((_a = e.data) == null ? void 0 : _a.message) || e.message || "Failed to load loan lists";
      } finally {
        loading.value = false;
      }
    }
    function editList(list) {
      router.push(`/lists/${list.id}/edit`);
    }
    async function deleteList(list) {
      var _a;
      const result = await Swal.fire({
        title: `Delete loan #${list.id}?`,
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel"
      });
      if (result.isConfirmed) {
        try {
          await $fetch(`/lists/${list.id}`, {
            method: "DELETE",
            baseURL: "http://localhost:3000",
            headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` }
          });
          await fetchLists();
          await Swal.fire({
            icon: "success",
            title: "Deleted!",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (e) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: ((_a = e.data) == null ? void 0 : _a.message) || e.message || "Delete failed"
          });
        }
      }
    }
    async function confirmReturn(list) {
      var _a;
      const result = await Swal.fire({
        title: `Mark loan #${list.id} as returned?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, return it",
        cancelButtonText: "Cancel"
      });
      if (!result.isConfirmed) return;
      try {
        await $fetch(`/lists/${list.id}/return`, {
          method: "PUT",
          baseURL: "http://localhost:3000",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            "Content-Type": "application/json"
          },
          body: { returnedDate: (/* @__PURE__ */ new Date()).toISOString() }
        });
        await fetchLists();
        await Swal.fire({
          icon: "success",
          title: "Returned!",
          showConfirmButton: false,
          timer: 1500
        });
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: ((_a = e.data) == null ? void 0 : _a.message) || e.message || "Return failed"
        });
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_UButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen bg-gray-50" }, _attrs))}>`);
      _push(ssrRenderComponent(AppSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6"><div class="bg-white shadow-lg rounded-lg p-6 max-w-7xl mx-auto"><h1 class="text-2xl font-bold text-gray-800">Loan Lists</h1><div class="mb-6 flex items-center justify-between"><div class="flex mt-3"><h2 class="${ssrRenderClass([
        "cp me-5",
        statusFilter.value === "borrowed" ? "text-darkblue font-semibold border-b-2 border-darkblue" : "text-gray-600"
      ])}"> Borrowed </h2><h2 class="${ssrRenderClass([
        "cp",
        statusFilter.value === "returned" ? "text-darkblue font-semibold border-b-2 border-darkblue" : "text-gray-600"
      ])}"> Returned </h2></div></div>`);
      if (loading.value) {
        _push(`<div class="flex items-center justify-center py-12"><div class="flex items-center space-x-2 text-gray-600">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-loader-2",
          class: "animate-spin text-4xl text-gray-500"
        }, null, _parent));
        _push(`<span class="text-lg">Loading loan lists...</span></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"><div class="flex items-center space-x-2 text-red-700">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-alert-circle",
          class: "text-xl"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(error.value)}</span></div></div>`);
      } else {
        _push(`<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow"><thead class="bg-gray-50"><tr><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"> No. </th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"> ID </th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"> User </th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"> Loan Date </th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"> Due Date </th>`);
        if (statusFilter.value === "returned") {
          _push(`<th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"> Return Date </th>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"> Fine </th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"> Status </th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"> Books </th><th class="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase"> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
        ssrRenderList(filteredLists.value, (list, i) => {
          _push(`<tr><td class="px-3 py-2 text-sm text-gray-900">${ssrInterpolate(i + 1)}</td><td class="px-3 py-2 text-sm text-gray-900">${ssrInterpolate(list.id)}</td><td class="px-4 py-2 text-sm text-gray-900">${ssrInterpolate(list.user.firstName)} ${ssrInterpolate(list.user.lastName)}<br><span class="text-xs text-gray-500">${ssrInterpolate(list.user.email)}</span></td><td class="px-4 py-2 text-sm text-gray-900">${ssrInterpolate(formatDate(list.loanDate))}</td><td class="px-4 py-2 text-sm text-gray-900">${ssrInterpolate(formatDate(list.dueDate))}</td>`);
          if (list.status === "returned") {
            _push(`<td class="px-4 py-2 text-sm text-gray-900">${ssrInterpolate(formatDate(list.returnedDate))}</td>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<td class="px-4 py-2 text-sm text-gray-900">${ssrInterpolate(list.fine)}</td><td class="px-4 py-2 text-sm"><span class="${ssrRenderClass([
            list.status === "borrowed" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800",
            "inline-flex px-2 py-1 text-xs font-semibold rounded-full"
          ])}">${ssrInterpolate(list.status === "borrowed" ? "Borrowed" : "Returned")}</span></td><td class="px-4 py-2 text-sm text-gray-900"><ul class="list-disc list-inside"><!--[-->`);
          ssrRenderList(list.books, (book) => {
            _push(`<li>${ssrInterpolate(book.name)}</li>`);
          });
          _push(`<!--]--></ul></td><td class="px-6 py-2 text-sm font-medium space-x-2">`);
          if (list.status === "borrowed") {
            _push(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              class: "text-green-400 hover:bg-green-100 cp",
              size: "sm",
              icon: "i-lucide-edit",
              onClick: ($event) => editList(list)
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (list.status === "borrowed") {
            _push(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              size: "sm",
              class: "text-green-400 hover:bg-green-100 cp",
              icon: "i-lucide-trash-2",
              onClick: ($event) => deleteList(list)
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (list.status === "borrowed") {
            _push(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              size: "sm",
              class: "text-green-400 hover:bg-green-100 cp",
              icon: "i-lucide-log-out",
              onClick: ($event) => confirmReturn(list)
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</td></tr>`);
        });
        _push(`<!--]-->`);
        if (lists.value.length === 0) {
          _push(`<tr><td colspan="10" class="px-6 py-12 text-center text-gray-500"> No loan records found. </td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tbody></table></div>`);
      }
      _push(`</div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/return.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=return-DuqhWkzL.mjs.map
