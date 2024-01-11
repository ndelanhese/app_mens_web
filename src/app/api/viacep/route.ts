import { NextResponse, type NextRequest } from 'next/server';

import { api } from '@axios';

import { z } from 'zod';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const postalCode = z.coerce.number().parse(searchParams.get('postal_code'));
  if (postalCode < 1) return new Response('Informe o CEP', { status: 400 });
  try {
    const { data: response } = await api.get(
      `https://viacep.com.br/ws/${postalCode}/json`,
    );
    return NextResponse.json(response);
  } catch (error: Error | any) {
    return new Response(error.message ?? 'Ocorreu um erro ao buscar o cep', {
      status: 500,
    });
  }
};
