import Image from "next/image";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useCart } from "@/hooks/use-cart";
import type { CartType } from "@/provider/app-context";

export default function Products() {
  const [cart, setCart] = useCart();
  const cartClear = () => {
    const x = window.confirm("Are You Sure?");
    if (x) {
      setCart({});
    }
  };

  const mapper = (cartValue: CartType, index: number) => {
    return (
      <ItemCard
        img={{ src: cartValue.url, alt: cartValue.name }}
        name={cartValue.name}
        noi={cartValue.numberOfItems}
        price={cartValue.price}
        id={Object.keys(cart)[index] ?? ""}
        key={index}
      />
    );
  };
  return (
    <div className="Products">
      <div className="card-info">
        <div className="title">
          <h1>Cart</h1>
          <span>
            (
            {Object.values(cart)
              .map((cartValue) => {
                return cartValue.numberOfItems;
              })
              .reduce((noi, nnoi) => {
                return noi + nnoi;
              }, 0)}{" "}
            products)
          </span>
        </div>
        <button onClick={cartClear}>clear cart</button>
      </div>
      <div className="items-container">{Object.values(cart).map(mapper)}</div>
    </div>
  );
}

function ItemCard({
  img,
  name,
  noi,
  price,
  id
}: {
  img: {
    src: string;
    alt: string;
  };
  name: string;
  noi: number;
  price: number;
  id: string;
}) {
  const [cart, setCart] = useCart();
  console.log(noi);
  return (
    <div className="item-card">
      <div className="img-container">
        <Image src={img.src} fill sizes="100%" alt={img.alt} />
      </div>
      <h4>{name}</h4>
      <div className="count">
        <button
          type="button"
          onClick={() => {
            const tempCart = cart;
            const tempCurrentItem = tempCart[`${id}`] as CartType;
            if (tempCurrentItem === undefined) throw new Error();
            if (noi - 1 === 0) {
              delete tempCart[`${id}`];
              setCart(tempCart);
              return;
            }
            tempCart[`${id}`] = {
              ...tempCurrentItem,
              numberOfItems: noi - 1
            };
            setCart(tempCart);
          }}
        >
          -
        </button>
        <span>{noi}</span>
        <button
          type="button"
          onClick={() => {
            const tempCart = cart;
            const tempCurrentItem = tempCart[`${id}`] as CartType;
            if (tempCurrentItem === undefined) return;
            tempCart[`${id}`] = {
              ...tempCurrentItem,
              numberOfItems: noi + 1
            };
            setCart(tempCart);
          }}
        >
          +
        </button>
      </div>
      <span>Rs {price * noi}</span>
      <button
        title="cancel"
        type="button"
        className="cancel"
        onClick={() => {
          const tempCart = cart;
          delete tempCart[`${id}`];
          setCart(tempCart);
        }}
      >
        <RiDeleteBin2Fill />
      </button>
    </div>
  );
}
