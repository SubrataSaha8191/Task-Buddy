export async function analyzeTasks(tasks) {
  try {
    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks }),
    });

    const data = await response.json();
    return data.analysis || "No analysis available.";
  } catch (error) {
    console.error(error);
    return "Error connecting to AI service.";
  }
}
