
import logoSc from "../assets/logo.png";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg p-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={logoSc}
            alt=""
            className="w-[260px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Sobre {""}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  Nosotros
                </span>
                
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
              Somos un estudio de diseño & desarrollo, ofreciendo servicios como diseño UX/UI, desarrollo de software a medida, branding, producciones audiovisuales de alta calidad y renderizado 3D. Nos destacamos por nuestra pasión por la calidad y la innovaciónSomos la opción para quienes quieren destacar en un mundo digital saturado; lo estándar no basta.Transformamos negocios con tecnología que conecta profundamente con las audiencias. Nuestro equipo ofrece soluciones innovadoras y técnicamente avanzadas. Desafiamos lo convencional para crear experiencias digitales excepcionales.
              </p>
            </div>

        
          </div>
        </div>
      </div>
    </section>
  );
};
