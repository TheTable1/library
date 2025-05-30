// /composables/useUser.js
import { ref, computed } from "vue";

const _user = ref({ id: "",fullName: "", email: "", role: "" });
let _initialized = false;

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function useUser() {
  if (!_initialized && process.client) {
    _initialized = true;
    const raw = localStorage.getItem("token");
    if (raw) {
      const payload = parseJwt(raw) || {};
      console.log("JWT payload in useUser:", payload);
      // payload อาจอยู่ตรงๆ หรือใน payload.user / payload.data
      const data = payload.user || payload.data || payload;
      const first = data.fName ;
      const last = data.lName ;
      _user.value.fullName =
        first || last ? `${first} ${last}`.trim() : data.name || "";
      _user.value.email = data.email ;
      _user.value.id = data.id ;
      // fallback อ่าน role จากทุกที่
      _user.value.role = data.role ;
    }
  }
  return {
    id: computed(()=> _user.value.id),
    fullName: computed(() => _user.value.fullName),
    email: computed(() => _user.value.email),
    role: computed(() => _user.value.role),
  };
}
