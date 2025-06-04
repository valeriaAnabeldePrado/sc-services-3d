import logogsg from "/gsg.png"
import juarez from "/JuarezP.png";
import ssi from "/bynlogossi.png";
import telefe from "/telefe.png";
import ypf from "/YPF2.png";

interface SponsorProps {
 img: string;
 clasNameStyle: string;
  name: string;
}

const sponsors: SponsorProps[] = [
  {
    img: logogsg,
    clasNameStyle: "h-[6vh] sm:h-[8vh] md:h-[10vh] lg:h-[12vh] object-contain grayscale",
    name: "Gsg Iluminación",
  },
  {
    img: juarez,
    clasNameStyle: "h-[6vh] sm:h-[8vh] md:h-[10vh] object-contain grayscale",
    name: "Sponsor 2",
  },
  {
    img: ssi,
    clasNameStyle: "h-[6vh] sm:h-[8vh] md:h-[10vh] object-contain grayscale",
    name: "Sponsor 3",
  },
  {
    img: ypf,
    clasNameStyle: "h-[5vh] sm:h-[6vh] md:h-[7vh] object-contain grayscale",
    name: "Sponsor 4",
  },
  {
    img: telefe,
    clasNameStyle: "h-[5vh] sm:h-[6vh] md:h-[10vh] object-contain grayscale",
    name: "Sponsor 5",
  },
];

export const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="container pt-24 sm:py-32"
    >
      <h2 className="text-center text-md text-3xl font-bold mb-12 text-primary ">
      Trayectoria respaldada por grandes marcas
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {sponsors.map(({ img, name, clasNameStyle }: SponsorProps) => (
          <div
            key={name}
            className="flex items-center gap-1 text-muted-foreground/60"
          >
            <img
              src={img}
              alt={name}
              className={clasNameStyle }/>
           
          </div>
        ))}
      </div>
    </section>
  );
};
