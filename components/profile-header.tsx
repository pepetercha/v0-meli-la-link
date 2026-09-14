'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function ProfileHeader() {
  return (
    <div className="text-center space-y-4">
      {/* Avatar */}
      <div className="flex justify-center">
        <Avatar className="w-24 h-24 border-4 border-purple-500">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=valdocer" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
      </div>

      {/* Nombre y usuario */}
      <div>
        <h1 className="text-4xl font-bold text-white">VALDOCER</h1>
        <p className="text-lg text-slate-400">@valdocer</p>
      </div>

      {/* Badge de estado */}
      <div className="flex justify-center gap-2">
        <Badge variant="default" className="bg-green-600/80">
          Activo
        </Badge>
        <Badge variant="secondary">Plataforma de Enlaces</Badge>
      </div>

      {/* Descripción */}
      <p className="max-w-md mx-auto text-slate-300">
        Bienvenido a mi espacio digital. Aquí encontrarás todos mis enlaces, redes sociales y contenido favorito en un solo lugar.
      </p>
    </div>
  );
}