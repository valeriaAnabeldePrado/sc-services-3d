import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import mockup from "/compuBanner.png";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#7d27f2] text-transparent bg-clip-text">
              Experiencia 3D interactiva e inmersiva
            </span>{" "}
            única en el mercado
          </h1>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Simulaciones arquitectónicas en alta calidad, con navegación fluida.
          Una herramienta poderosa para comunicar proyectos con claridad y
          visión. Visita nuestras demos y descubre su potencial.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button
            className="w-full md:w-1/3"
            onClick={() => navigate("/edificio")}
          >
            Ver Edificio
          </Button>
          <Button
            className="w-full md:w-1/3"
            onClick={() => navigate("/departamento")}
          >
            Ver Departamento
          </Button>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <img src={mockup} alt="mk" className="h-[55vh] object-contain" />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
