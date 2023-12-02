import { Metadata } from 'next';
import NextImage from 'next/image';

import { SigninForm } from './shards/signinForm';

export const metadata: Metadata = {
  title: 'Entrar',
};

const SignIn = () => {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-7">
      <div className="h-[7rem] w-[7rem] overflow-hidden rounded-full border dark:border-white-40">
        <NextImage
          src={'/user-icon.png'}
          alt="avatar-image"
          loading="lazy"
          height={112}
          width={112}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="dark:text-white text-xl font-sb">
          Loja Men&apos;s Modas
        </h1>
        <p className="text-md dark:text-white-40">
          Entre com seu usuário e senha
        </p>
      </div>
      <SigninForm />
    </section>
  );
};
export default SignIn;
