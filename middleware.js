import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  const protectedRoutes = ['/vendas', '/desbloquear', '/espionar'];
  
  // Exemplo: verifica se o usuário está autenticado (substitua com a lógica de autenticação do seu projeto)
  const isAuthenticated = request.cookies.get('authToken'); // supondo que você usa um cookie para autenticação

  if (protectedRoutes.includes(url.pathname)) {
    if (!isAuthenticated) {
      // Redireciona para a página de login se não estiver autenticado
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
