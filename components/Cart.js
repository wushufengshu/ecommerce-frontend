import { useStateContext } from "../lib/context";
import {
    CartWrapper,
    CartStyle,
    Card,
    CardInfo,
    EmptyStyle,
    Checkout,
} from "../styles/CartStyles";
import { Quantity } from "../styles/ProductDetails";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

export default function Cart() {
    const { cartItems, setShowCart, onAdd, onRemove, totalPrice } = useStateContext();
    return (
        <CartWrapper
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}

            onClick={() => setShowCart(false)}>
            <CartStyle
                initial={{ x: '50%' }}
                animate={{ x: '0%' }}
                transition={{ type: 'tween' }}
                exit={{ x: '50%' }}
                onClick={(e) => e.stopPropagation()}>
                {cartItems.length < 1 && (
                    <EmptyStyle
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: .2 }}
                    >
                        <h1>You have more shopping to do 💨</h1>
                        <FaShoppingCart />
                    </EmptyStyle>
                )}
                {cartItems.length >= 1 &&
                    cartItems.map((item) => {
                        return (
                            <Card

                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: .3 }}
                                key={item.slug}>
                                <img
                                    src={
                                        item.image.data.attributes.formats
                                            .thumbnail.url
                                    }
                                    alt={item.title}
                                />
                                <CardInfo>
                                    <h3>{item.title}</h3>
                                    <h3>${item.price}</h3>
                                    <Quantity>
                                        <span>Quantity</span>
                                        <button onClick={() => onRemove(item)}>
                                            <AiFillMinusCircle />
                                        </button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => onAdd(item, 1)}>
                                            <AiFillPlusCircle />
                                        </button>
                                    </Quantity>
                                </CardInfo>
                            </Card>
                        );
                    })}
                {cartItems.length >= 1 && (
                    <Checkout>
                        <h3>Subtotal: ${totalPrice}</h3>
                        <button>Purchase</button>
                    </Checkout>
                )}
            </CartStyle>
        </CartWrapper>
    );
}
