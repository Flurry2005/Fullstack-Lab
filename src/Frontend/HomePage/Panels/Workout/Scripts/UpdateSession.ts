import type { Session } from "../../../../types/Session";

export async function updateSession(session: Session) {
  try {
    const response = await fetch(`http://localhost:3000/update-session`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session: session }),
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
