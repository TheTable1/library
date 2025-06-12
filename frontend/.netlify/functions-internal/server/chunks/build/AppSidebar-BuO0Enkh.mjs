import { _ as _sfc_main$1 } from './Icon-DGs3lips.mjs';
import { ref, computed, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "AppSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    const isOpen = ref(false);
    const showSettings = ref(false);
    const role = ref("");
    ref(null);
    const fullName = ref("");
    const email = ref("");
    const photo = ref("");
    const activePath = computed(() => route.path);
    function isActive(prefix) {
      return activePath.value.startsWith(prefix);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-4ec476c2><button class="fixed top-4 left-4 z-50 bg-white/90 rounded-lg shadow-lg p-2 pb-1 cp" data-v-4ec476c2>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-menu",
        class: "text-gray-700 text-xl"
      }, null, _parent));
      _push(`</button><aside class="${ssrRenderClass([
        "flex flex-col bg-gray-900 text-white h-screen w-64 fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out",
        isOpen.value ? "translate-x-0" : "-translate-x-full"
      ])}" data-v-4ec476c2>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/login",
        class: "block mt-12"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 border-b border-gray-700 flex items-center space-x-3" data-v-4ec476c2${_scopeId}><div class="bg-blue-600 p-2 rounded-lg" data-v-4ec476c2${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-layout-dashboard",
              class: "text-white text-xl"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-4ec476c2${_scopeId}><h1 class="text-xl font-bold" data-v-4ec476c2${_scopeId}>Sanbrary</h1><p class="text-gray-400 text-sm" data-v-4ec476c2${_scopeId}>Library System</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 border-b border-gray-700 flex items-center space-x-3" }, [
                createVNode("div", { class: "bg-blue-600 p-2 rounded-lg" }, [
                  createVNode(_component_UIcon, {
                    name: "i-lucide-layout-dashboard",
                    class: "text-white text-xl"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("h1", { class: "text-xl font-bold" }, "Sanbrary"),
                  createVNode("p", { class: "text-gray-400 text-sm" }, "Library System")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="flex-1 px-2 py-6 overflow-y-auto" data-v-4ec476c2><div class="mb-6" data-v-4ec476c2><h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3" data-v-4ec476c2> Main Menu </h2><ul class="space-y-1" data-v-4ec476c2><li data-v-4ec476c2>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/book",
        class: [
          "flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 pl-3 pr-2",
          isActive("/book") ? "bg-white text-darkblue" : "text-gray-300 hover:bg-gray-800 hover:text-white"
        ]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-book-text",
              class: "text-lg mr-3 flex-shrink-0"
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-4ec476c2${_scopeId}>Book</span>`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-lucide-book-text",
                class: "text-lg mr-3 flex-shrink-0"
              }),
              createVNode("span", null, "Book")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-4ec476c2>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/favorite",
        class: [
          "flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 pl-3 pr-2",
          isActive("/favorite") ? "bg-white text-darkblue" : "text-gray-300 hover:bg-gray-800 hover:text-white"
        ]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-heart",
              class: "text-lg mr-3 flex-shrink-0"
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-4ec476c2${_scopeId}>Favorite</span>`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-lucide-heart",
                class: "text-lg mr-3 flex-shrink-0"
              }),
              createVNode("span", null, "Favorite")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div>`);
      if (role.value === "admin") {
        _push(`<div class="mb-6" data-v-4ec476c2><h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3" data-v-4ec476c2> Admin </h2><ul class="space-y-1" data-v-4ec476c2><li data-v-4ec476c2>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/user",
          class: [
            "flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 pl-3 pr-2",
            isActive("/user") ? "bg-white text-darkblue" : "text-gray-300 hover:bg-gray-800 hover:text-white"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-users",
                class: "text-lg mr-3 flex-shrink-0"
              }, null, _parent2, _scopeId));
              _push2(`<span data-v-4ec476c2${_scopeId}>User</span>`);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-lucide-users",
                  class: "text-lg mr-3 flex-shrink-0"
                }),
                createVNode("span", null, "User")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li data-v-4ec476c2>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/manageBook",
          class: [
            "flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 pl-3 pr-2",
            isActive("/manageBook") ? "bg-white text-darkblue" : "text-gray-300 hover:bg-gray-800 hover:text-white"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-book-open",
                class: "text-lg mr-3 flex-shrink-0"
              }, null, _parent2, _scopeId));
              _push2(`<span data-v-4ec476c2${_scopeId}>Manage Book</span>`);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-lucide-book-open",
                  class: "text-lg mr-3 flex-shrink-0"
                }),
                createVNode("span", null, "Manage Book")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li data-v-4ec476c2>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/category",
          class: [
            "flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 pl-3 pr-2",
            isActive("/category") ? "bg-white text-darkblue" : "text-gray-300 hover:bg-gray-800 hover:text-white"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-chart-column-stacked",
                class: "text-lg mr-3 flex-shrink-0"
              }, null, _parent2, _scopeId));
              _push2(`<span data-v-4ec476c2${_scopeId}>Category</span>`);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-lucide-chart-column-stacked",
                  class: "text-lg mr-3 flex-shrink-0"
                }),
                createVNode("span", null, "Category")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li data-v-4ec476c2><button class="w-full flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-gray-800 text-gray-300 hover:text-white px-3" data-v-4ec476c2>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-settings",
          class: "text-lg mr-3 flex-shrink-0"
        }, null, _parent));
        _push(`<span class="flex-1 text-left" data-v-4ec476c2>Management</span>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-chevron-down",
          class: ["text-sm transition-transform", showSettings.value ? "rotate-180" : ""]
        }, null, _parent));
        _push(`</button><div style="${ssrRenderStyle(showSettings.value ? null : { display: "none" })}" class="mt-1 ml-6 space-y-1" data-v-4ec476c2>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/borrow",
          class: "flex items-center px-3 py-2 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-book-plus",
                class: "mr-3 text-base"
              }, null, _parent2, _scopeId));
              _push2(` Borrowing `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-lucide-book-plus",
                  class: "mr-3 text-base"
                }),
                createTextVNode(" Borrowing ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_router_link, {
          to: "/return",
          class: "flex items-center px-3 py-2 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-book-up-2",
                class: "mr-3 text-base"
              }, null, _parent2, _scopeId));
              _push2(` Returning `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-lucide-book-up-2",
                  class: "mr-3 text-base"
                }),
                createTextVNode(" Returning ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></li></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><div class="p-4 border-t border-gray-700 cursor-pointer" data-v-4ec476c2><div class="flex items-center space-x-3" data-v-4ec476c2><div class="h-8 w-8 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center" data-v-4ec476c2>`);
      if (photo.value) {
        _push(`<img${ssrRenderAttr("src", photo.value)} alt="User avatar" class="h-full w-full object-cover" data-v-4ec476c2>`);
      } else {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-user",
          class: "text-white text-sm"
        }, null, _parent));
      }
      _push(`</div><div data-v-4ec476c2><p class="text-sm font-medium text-white truncate" data-v-4ec476c2>${ssrInterpolate(fullName.value)}</p><p class="text-xs text-gray-400 truncate" data-v-4ec476c2>${ssrInterpolate(email.value)}</p></div></div></div></aside></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppSidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppSidebar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4ec476c2"]]);

export { AppSidebar as A };
//# sourceMappingURL=AppSidebar-BuO0Enkh.mjs.map
