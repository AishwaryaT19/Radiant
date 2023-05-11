import Link from "next/link";
import { categoryPageHeading } from "./text";
import type { CategoryArrayType, CategoryProps, CategoryType } from "./types";
import Image from "next/image";

const mapper = (elem: CategoryArrayType, index: number) => {
  return (
    <CategoryCard
      key={index}
      title={elem.title}
      imgUrl={elem?.bannerimage?.url ?? "/logo.png"}
    />
  );
};
export default function Categories({ data }: CategoryProps) {
  return (
    <div className="category" id="category">
      <h2>{categoryPageHeading}</h2>
      <div className="cards-container">{data.map(mapper)}</div>
    </div>
  );
}

function CategoryCard(props: CategoryType) {
  const { title, imgUrl } = props;
  return (
    <Link
      href={"/" + title.replaceAll(" ", "-").toLowerCase()}
      className="img-container category-card"
    >
      <Image src={imgUrl} fill sizes="100%" alt={title} />
      <h2>{title}</h2>
    </Link>
  );
}
