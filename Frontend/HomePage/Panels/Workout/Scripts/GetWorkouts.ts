export async function getWorkouts() {
  try {
    const response = await fetch(`http://localhost:3000/get-workouts`, {
      method: "GET",
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
