import Image from "next/image";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useCart, useSetCart } from "@/hooks/use-cart";
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
    const img = { src: cartValue.url, alt: cartValue.name };
    const name = cartValue.name;
    const noi = cartValue.numberOfItems;
    const price = cartValue.price;
    const id = Object.keys(cart)[index] ?? "";
    const key = index;
    return <ItemCard img={img} name={name} noi={noi} price={price} id={id} key={key} />;
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
  const setCart = useSetCart();
  const onMinus = () => {
    setCart((tempCart) => {
      const tempCurrentItem = tempCart[`${id}`] as CartType;
      if (tempCurrentItem === undefined) throw new Error();
      if (noi - 1 === 0) {
        const temp = { ...tempCart };
        delete temp[`${id}`];
        return temp;
      }
      const temp = { ...tempCart };
      temp[`${id}`] = {
        ...tempCurrentItem,
        numberOfItems: noi - 1
      };
      return temp;
    });
  };
  const onPlus = () => {
    setCart((prevCart) => {
      const tempCart = { ...prevCart };
      const tempCurrentItem = tempCart[`${id}`];
      if (tempCurrentItem === undefined) return tempCart;
      tempCart[`${id}`] = {
        ...tempCurrentItem,
        numberOfItems: noi + 1
      };
      return tempCart;
    });
  };
  const onDel = () => {
    setCart((prevCart) => {
      const tempCart = { ...prevCart };
      delete tempCart[`${id}`];
      return tempCart;
    });
  };
  return (
    <div className="item-card">
      <div className="img-container">
        <Image src={img.src} fill sizes="100%" alt={img.alt} />
      </div>
      <h4>{name}</h4>
      <div className="count">
        <button type="button" onClick={onMinus}>
          -
        </button>
        <span>{noi}</span>
        <button type="button" onClick={onPlus}>
          +
        </button>
      </div>
      <span>Rs {price * noi}</span>
      <button title="cancel" type="button" className="cancel" onClick={onDel}>
        <RiDeleteBin2Fill />
      </button>
    </div>
  );
}
