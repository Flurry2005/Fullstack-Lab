import type { Exercice } from "../../../../types/Exercice";

export async function createWorkout(
  workoutName: string,
  tags: string[],
  exercices: Exercice[],
) {
  if (workoutName.trim() === "" || workoutName.trim().length <= 2) {
    //invalid formats
    console.error("Invalid workout name");
    return { success: false, error: "Invalid workout name" };
  }

  try {
    const response = await fetch(`http://localhost:3000/create-workout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workoutName: workoutName, tags, exercices }),
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
