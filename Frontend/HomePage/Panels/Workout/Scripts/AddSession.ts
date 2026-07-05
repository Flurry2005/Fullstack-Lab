export async function addSession(workoutId: string, date: Date) {
  if (workoutId.trim() === "") {
    //invalid formats
    console.error("Invalid workout id");
    return { success: false, error: "Invalid workout id" };
  }

  try {
    const response = await fetch(`http://localhost:3000/add-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workoutId: workoutId, date: date }),
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
