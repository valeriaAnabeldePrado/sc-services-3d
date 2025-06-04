import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <LogoIcon />
            SmarCloud Studio
          </a>
        </div>

       
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Contáctanos</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://www.smartcloudstudio.com/"
              className="opacity-60 hover:opacity-100"
            >
              Web
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="mailto:contacto@smartcloudstudio.com"
              className="opacity-60 hover:opacity-100"
            >
              contacto@smartcloudstudio.com
            </a>
          </div>
          <a href="https://wa.me/2995831639">
            <button className="block w-full mt-4 bg-indigo-600 rounded-full px-3.5 py-2.5 text-center text-lg font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 buttonb">
              <p className="contactanos-p">WhatsApp</p>
            </button>
          </a>
        </div>

      
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2025 Landing page made by{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.linkedin.com/in/mauro-lobo-b6445b15a/"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Anabel de Prado , Mauro Lobo
          </a>
        </h3>
      </section>
    </footer>
  );
};
