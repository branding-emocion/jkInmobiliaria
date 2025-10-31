"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Form from "../../components/_Form";

export default function EditarProyecto() {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  return (
    <Form mode="edit" projectId={params.id} onLoadingChange={setLoading} />
  );
}
