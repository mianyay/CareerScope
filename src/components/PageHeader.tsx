import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, children }: Props) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className="pill mx-auto">{eyebrow}</p>
      <h1 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">{title}</h1>
      <p className="mt-3 text-base text-muted-foreground sm:text-lg">{description}</p>
      {children && <div className="mt-5 flex flex-wrap justify-center gap-3">{children}</div>}
    </header>
  );
}
