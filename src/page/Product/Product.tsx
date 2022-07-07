import { Container, ProductSlider } from '../../Layout';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { IProducts } from '../../types/productsType';
import useForm from '../../hook/useForm';
import { TiTick } from 'react-icons/ti';
import { RiCloseFill } from 'react-icons/ri';
import './Product.css';
import { Button, Input } from '../../components';

const Product: React.FC = () => {
  const { id } = useParams<string>();
  const [product, setProduct] = useState<IProducts | null>(null);
  const handleAddToCart = () => {
    console.log('submit');
    console.log(values);
  };
  useEffect(() => {
    (async () => {
      try {
        const docRef = doc(db, 'products', `${id}`);
        const data = await getDoc(docRef);
        const productData: any = data.data();
        setProduct(productData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const { handleChange, handleSubmit, values } = useForm(handleAddToCart, { quantity: 1 });
  if (!product) {
    return <h2>nothig found</h2>;
  }
  return (
    <Container>
      <div className='product-page__path'>
        <Link className='product-page__path-link' to='/'>
          Home
        </Link>{' '}
        /{' '}
        <Link className='product-page__path-link' to='/shop'>
          Shop
        </Link>{' '}
        / {product.name}
      </div>
      <div className='product-page'>
        <div className='product-page__image'>
          <ProductSlider images={product.imageUrls} />
        </div>
        <div className='product-page__content'>
          <h2 className='product-page__content__title'>{product.name}</h2>
          <span className='product-page__content__date'>
            {new Timestamp(product.timeStamp.seconds, product.timeStamp.nanoseconds).toDate().toDateString()}
          </span>
          <h4 className='product-page__content__price'>$ {product.price}</h4>
          <hr className='product-page__line' />
          <div className='product-page__status'>
            <h4 className='product-page__status__stock'>
              <span style={{ color: '#0000009d' }}>Availability :</span>{' '}
              {product.inStock ? (
                <span className='product-page__status__stock-text'>
                  in stock <TiTick className='product-page__status__stock-icon' />
                </span>
              ) : (
                <span className='product-page__status__stock-text'>
                  out of stock <RiCloseFill className='product-page__status__out-stock-icon' />
                </span>
              )}
            </h4>
            <h4 className='product-page__status-text'>Imported from USA store</h4>
          </div>
          <hr className='product-page__line' />
          <form className='product-page__buy-section' onSubmit={handleSubmit}>
            <div className='product-page__buy-section__input'>
              <h4>Quantity :</h4>
              <Input
                min={1}
                onChange={handleChange}
                value={values.quantity}
                name='quantity'
                placeholder='1'
                type='number'
              />
            </div>
            <Button type='submit'>ADD TO CART</Button>
          </form>
          <p className='product-page__warn-message'>
            Note: Electronic products sold in US store operate on (110-120) volts, a step-down power converter is
            required for the smooth device function. It is mandatory to know the wattage of the device in order to
            choose the appropriate power converter. Recommended power converters
          </p>
        </div>
      </div>
      <hr className='product-page__line' />
      <div className='product-page__discription'>
        <h4 className='product-page__discription__title'>discription</h4>
        <p className='product-page__discription__text'>{product.description}</p>
      </div>
    </Container>
  );
};

export default Product;
