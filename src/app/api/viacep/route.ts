import { api } from '@axios';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const postalCode = z.string().parse(searchParams.get('postal_code'));
  if (postalCode.length < 8)
    return new Response('Informe o CEP', { status: 400 });
  try {
    const { data: response } = await api.get(
      `https://viacep.com.br/ws/${postalCode}/json`,
    );
    if (response?.erro) {
      return new NextResponse('Ocorreu um erro ao buscar o cep', {
        status: 500,
      });
    }
    return NextResponse.json(response);
  } catch (error: Error | any) {
    return new NextResponse(
      error.message ?? 'Ocorreu um erro ao buscar o cep',
      {
        status: 500,
      },
    );
  }
};
