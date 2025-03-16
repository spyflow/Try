import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Este middleware maneja las redirecciones para las rutas antiguas
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Redirigir las rutas antiguas a las nuevas
  if (pathname === '/redirect') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirigir /watch/ antiguo a /watch/[id]
  if (pathname === '/watch/') {
    const id = searchParams.get('id');
    const type = searchParams.get('type') || 'pelicula';
    const season = searchParams.get('season');
    const cap = searchParams.get('cap');

    if (id) {
      let newUrl = `/watch/${id}?type=${type}`;

      // Si es una serie y tiene temporada y capítulo
      if (type === 'serie' && season && cap) {
        newUrl += `&season=${season}&episode=${cap}`;
      }

      return NextResponse.redirect(new URL(newUrl, request.url));
    }
  }

  // Redirigir /view/ antiguo a /view/[id]
  if (pathname === '/view/') {
    const id = searchParams.get('id');
    const type = searchParams.get('type') || 'pelicula';

    if (id) {
      return NextResponse.redirect(new URL(`/view/${id}?type=${type}`, request.url));
    }
  }

  return NextResponse.next();
}

// Configurar las rutas que deben ser gestionadas por el middleware
export const config = {
  matcher: ['/redirect', '/watch/', '/view/'],
};
