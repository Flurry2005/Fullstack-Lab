import type { User } from "../../../../types/User";

export async function updateUser(user: User) {
  try {
    const response = await fetch(`http://localhost:3000/update-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user }),
      credentials: "include",
    });

    const res = await response.json();

    if (res.success) {
      return { success: res.success, data: res.data };
    } else {
      return { success: res.success, error: res.error };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to contact server" };
  }
}
