import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TbHexagon3D } from "react-icons/tb";
import { LuBrain } from "react-icons/lu";
import { FaChartColumn } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <TbHexagon3D size={40}/>,
    title: "Visualización Interactiva 3D",
    description:
      "Explora cada detalle del proyecto con nuestros modelos 3D inmersivos. Gira, haz zoom y recorre los espacios como si estuvieras allí",
  },
  {
    icon: <LuBrain size={40}/>,
    title: "Asistente IA Personalizado",
    description:
      "Tu agente IA dedicado te acompaña, responde tus consultas 24/7 y realiza un seguimiento proactivo de tus intereses y avances.",
  },
  {
    icon: <FaChartColumn size={40}/>,
    title: "Información y Datos Clave",
    description:
      "Accede a toda la información relevante del proyecto, especificaciones y datos actualizados, curados y presentados por nuestra IA",
  },
  {
    icon: <FaRegCalendarCheck size={40}/>,
    title: "Seguimiento y Alertas Inteligentes",
    description:
      "Recibe notificaciones y alertas personalizadas sobre novedades, oportunidades o tareas pendientes, gestionadas por tu asistente IA.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="features"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        Funcionalidades {""}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
        únicas en el mercado
        </span>
      
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
      Descubrí un conjunto de herramientas diseñadas para transformar la manera en que se comunican y comercializan los desarrollos inmobiliarios. Combinamos visualización 3D, inteligencia artificial y automatización para brindar una experiencia inmersiva, informativa y completamente personalizada.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center ">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
