import Image from "next/image";

interface IPartner {
  name: string;
  flag: string;
}

const Partnership: React.FC = () => {
  const partners: IPartner[] = [
    {
      name: "Turkey",
      flag: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg",
    },
    {
      name: "Britain",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png",
    },
    {
      name: "Finland",
      flag: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg",
    },
    {
      name: "Northern Macedonia",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_North_Macedonia.svg/1200px-Flag_of_North_Macedonia.svg.png",
    },
    {
      name: "Spain",
      flag: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
    },
  ];

  return (
    <>
      <h1 className="text-center text-3xl mb-4">Our Partners</h1>
      <div className="partners-list">
        {partners.map((partner) => (
          <div key={partner.name} className="partners-list-item">
            <Image src={partner.flag} width="210" height="140" />
            <h3 className="col-span-2 text-center self-center">
              {partner.name}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Partnership;
