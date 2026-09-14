import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Menu, ShoppingBag, Twitter, Youtube } from "lucide-react"
import { getExample, getProfile, getWishlist, normalizeList, type Profile, type WishlistItem } from "@/lib/railway"

const icons = { Instagram, Twitter, Youtube, Github, Linkedin, Mail, ShoppingBag }
function Icon({ name }: { name?: string }) { const Component = icons[name as keyof typeof icons] ?? ArrowUpRight; return <Component className="size-4" /> }

export default async function LinkPage() {
  let profile: Profile = {}; let wishlist: WishlistItem[] = []; let example: { mensaje?: string } = {}
  try { [profile, wishlist, example] = await Promise.all([getProfile(), getWishlist(), getExample()]); wishlist = normalizeList<WishlistItem>(wishlist) } catch { /* Railway may be temporarily unavailable */ }
  const socials = profile.socials ?? []
  const links = profile.links ?? []
  const name = profile.nombre ?? "VALDOCER"
  const username = profile.username ?? "@valdocer"
  return <main className="min-h-screen overflow-hidden bg-[#081313] text-[#edf8f2]">
    <div className="pointer-events-none fixed -left-40 -top-40 size-[480px] rounded-full bg-[#66e6ba]/10 blur-[120px]" />
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-6 sm:px-10 lg:flex-row lg:gap-20 lg:px-16 lg:py-12">
      <header className="flex flex-col justify-between lg:sticky lg:top-12 lg:h-[calc(100vh-6rem)] lg:w-[330px] lg:shrink-0">
        <div><div className="mb-10 flex items-center justify-between"><span className="font-mono text-sm tracking-[0.28em] text-[#66e6ba]">ML / 01</span><a href="/admin" className="rounded-full border border-white/10 p-2 text-white/50 transition hover:border-[#66e6ba]/50 hover:text-[#66e6ba]" aria-label="Abrir administración"><Menu className="size-4" /></a></div>
          <div className="mb-8 size-24 overflow-hidden rounded-[2rem] border border-[#66e6ba]/40 bg-[#19332d] p-1"><div className="flex size-full items-center justify-center rounded-[1.7rem] bg-[#66e6ba] text-3xl font-black text-[#081313]">{name.slice(0, 1)}</div></div>
          <p className="mb-2 font-mono text-sm text-[#66e6ba]">{username}</p><h1 className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">{name}</h1><p className="mt-6 max-w-xs text-base leading-7 text-white/55">{profile.bio ?? "Construyendo ideas, compartiendo proyectos y conectando personas."}</p>
        </div>
        <div className="mt-12 hidden lg:block"><p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-white/30">Conecta conmigo</p><div className="flex flex-wrap gap-2">{socials.map((social, index) => <a key={`${social.label}-${index}`} href={social.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:border-[#66e6ba]/60 hover:text-[#66e6ba]"><Icon name={social.icon} />{social.label}</a>)}</div></div>
      </header>
      <section className="w-full max-w-2xl py-10 lg:py-16"><div className="mb-8 flex items-end justify-between border-b border-white/10 pb-5"><div><p className="font-mono text-xs uppercase tracking-[0.25em] text-[#66e6ba]">Enlaces seleccionados</p><h2 className="mt-2 text-2xl font-medium">Encuéntrame online</h2></div><span className="font-mono text-xs text-white/30">{String(links.length).padStart(2, "0")} LINKS</span></div>
        <div className="flex flex-col gap-3">{links.map((link, index) => <a key={`${link.label}-${index}`} href={link.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:border-[#66e6ba]/60 hover:bg-[#66e6ba]/10"><span className="flex items-center gap-4"><span className="flex size-10 items-center justify-center rounded-xl bg-[#19332d] text-[#66e6ba]"><Icon name={link.icon} /></span><span className="font-medium">{link.label}</span></span><ArrowUpRight className="size-5 text-white/30 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#66e6ba]" /></a>)}</div>
        <div className="mt-14 border-t border-white/10 pt-6"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-medium">Wishlist</h2><ShoppingBag className="size-5 text-[#66e6ba]" /></div>{wishlist.length === 0 ? <p className="text-sm text-white/40">Próximamente compartiré mis próximos objetivos.</p> : <div className="grid gap-3 sm:grid-cols-2">{wishlist.map((item, index) => <a key={String(item.id ?? index)} href={item.url ?? "#"} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#66e6ba]/50"><p className="font-medium">{item.nombre ?? item.title ?? "Producto"}</p>{(item.precio ?? item.price) && <p className="mt-2 font-mono text-sm text-[#66e6ba]">{item.precio ?? item.price}</p>}</a>)}</div>}</div>
        {example.mensaje && <p className="mt-12 font-mono text-xs text-white/25">{example.mensaje}</p>}<p className="mt-12 font-mono text-xs text-white/25">© {new Date().getFullYear()} {name} · Hecho con intención.</p>
      </section>
    </div>
  </main>
}
