"use client"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [message, setMessage] = useState(""); const [loading, setLoading] = useState(false)
  async function login(event: React.FormEvent) { event.preventDefault(); setLoading(true); const result = await authClient.signIn.email({ email, password }); setLoading(false); if (result.error) setMessage("No se pudo iniciar sesión."); else window.location.href = "/admin/panel" }
  return <main className="flex min-h-screen items-center justify-center bg-[#081313] px-5 text-[#edf8f2]"><form onSubmit={login} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8"><p className="font-mono text-xs tracking-[0.25em] text-[#66e6ba]">ML / ADMIN</p><h1 className="mt-4 text-3xl font-semibold">Acceso privado</h1><p className="mt-2 text-sm text-white/50">Gestiona tu contenido conectado a Railway.</p><div className="mt-8 flex flex-col gap-4"><Input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><Input required type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} /><Button disabled={loading} className="bg-[#66e6ba] text-[#081313] hover:bg-[#8af0ca]">{loading ? "Entrando..." : "Entrar"}</Button></div>{message && <p className="mt-4 text-sm text-red-300">{message}</p>}<a href="/" className="mt-6 block text-center text-sm text-white/40 hover:text-white">Volver al perfil</a></form></main>
}
