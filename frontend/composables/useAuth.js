import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const user = ref(null);
  const loading = ref(false);
  const router = useRouter();

  async function fetchMe() {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    loading.value = true;
    try {
      const res = await $fetch("/users/me", {
        baseURL: "http://localhost:3000",
        headers: { Authorization: `Bearer ${token}` },
      });
      user.value = res.data;
    } catch {
      localStorage.removeItem("token");
      router.push("/login");
    } finally {
      loading.value = false;
    }
  }

  onMounted(fetchMe);

  return { user, loading };
};
