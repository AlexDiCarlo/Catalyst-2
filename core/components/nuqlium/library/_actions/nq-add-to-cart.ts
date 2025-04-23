'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { addCartLineItem } from '~/client/mutations/add-cart-line-item';
import { createCart } from '~/client/mutations/create-cart';
import { getCart } from '~/client/queries/get-cart';
import { TAGS } from '~/client/tags';

export const addToCartNQ = async (data: FormData) => {
  const productEntityId = Number(data.get('product_id'));
  const cartId = cookies().get('cartId')?.value;
  const variantEntityId = Number(data.get('variant_id'));

  let cart;

  try {
    cart = await getCart(cartId);
    console.log("Cart Before")
    console.log(cart)

    if (cart) {
      cart = await addCartLineItem(cart.entityId, {
        lineItems: [
          {
            productEntityId,
            quantity: 1,
            variantEntityId
          },
        ],
      });

      console.log("Cart After")
      console.log(cart)

      if (!cart?.entityId) {
        console.log(!cart?.entityId)
        return { status: 'error', error: 'Failed to add product to cart.' };
      }

      revalidateTag(TAGS.cart);

      return { status: 'success', data: cart };
    }

    cart = await createCart([{ productEntityId, quantity: 1, variantEntityId }]);

    if (!cart?.entityId) {
      return { status: 'error', error: 'Failed to add product to cart.' };
    }

    cookies().set({
      name: 'cartId',
      value: cart.entityId,
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
    });

    revalidateTag(TAGS.cart);

    return { status: 'success', data: cart };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { status: 'error', error: error.message };
    }

    return { status: 'error', error: 'Something went wrong. Please try again.' };
  }
};
