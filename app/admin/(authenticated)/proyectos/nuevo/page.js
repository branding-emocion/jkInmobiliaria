"use client";
import { useState } from "react";
import Form from "../components/_Form";

export default function NuevoProyecto() {
  const [loading, setLoading] = useState(false);
  
  return (
    <Form mode="create" onLoadingChange={setLoading} />
  );
}
