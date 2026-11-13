export default function Footer() {
  return (
    <footer className="mt-auto bg-[#020B2D] text-slate-300 border-t border-cyan-500/20 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <p className="text-white font-bold text-base">
            Curso de Formação em IA Generativa
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Página didática de apoio ao estudo dos alunos após as aulas presenciais.
          </p>
          <p className="text-xs text-cyan-400 font-semibold mt-2">
            © 2026 CucandoTI — Todos os direitos reservados.
          </p>
        </div>

        <div className="text-xs space-y-1 text-slate-400">
          <p className="text-slate-200 font-semibold">
            Prof. Francisco das Chagas Teófilo da Silva
          </p>
          <p>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/teophilo-silva-dev/"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-300 hover:underline"
            >
              teophilo-silva-dev
            </a>{" "}
            · GitHub:{" "}
            <a
              href="https://github.com/proftheosilva"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-300 hover:underline"
            >
              proftheosilva
            </a>
          </p>
          <p>
            YouTube: <span className="text-cyan-300">@CucandoTI</span> · E-mail:{" "}
            <a
              href="mailto:professorteophilo@gmail.com"
              className="text-cyan-300 hover:underline"
            >
              professorteophilo@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
