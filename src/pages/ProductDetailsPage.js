import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://dummyjson.com/products');
        const data = response.data.products.map(product => ({
          key: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage,
          brand: product.brand,
          category: product.category,
          thumbnail: product.thumbnail
        }));
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCompare = (product) => {
    if (compareList.length >= 4) {
      alert('You can only compare up to 4 products.');
      return;
    }
    if (compareList.find(item => item.key === product.key)) {
      alert('This product is already in the compare list.');
      return;
    }
    setCompareList(prevList => [...prevList, product]);
  };

  const isCompared = (key) => {
    return compareList.some(product => product.key === key);
  };

  const columns = [
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Image</span>,
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail) => (
        <img src={thumbnail} alt="product" style={{ width: 50, height: 50 }} />
      )
    },
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Title</span>,
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <span style={{ fontWeight: isCompared(record.key) ? 'bold' : 'normal' }}>
          {text}
        </span>
      )
    },
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Description</span>,
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => (
        <span style={{ fontWeight: isCompared(record.key) ? 'bold' : 'normal' }}>
          {text}
        </span>
      )
    },
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Price</span>,
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (text, record) => (
        <span style={{ fontWeight: isCompared(record.key) ? 'bold' : 'normal' }}>
          ${text}
        </span>
      )
    },
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Discount</span>,
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
      render: (discount, record) => (
        <span style={{ fontWeight: isCompared(record.key) ? 'bold' : 'normal' }}>
          {discount}%
        </span>
      )
    },
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Brand</span>,
      dataIndex: 'brand',
      key: 'brand',
      render: (text, record) => (
        <span style={{ fontWeight: isCompared(record.key) ? 'bold' : 'normal' }}>
          {text}
        </span>
      )
    },
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Category</span>,
      dataIndex: 'category',
      key: 'category',
      render: (text, record) => (
        <span style={{ fontWeight: isCompared(record.key) ? 'bold' : 'normal' }}>
          {text}
        </span>
      )
    },
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Action</span>,
      key: 'action',
      render: (_, record) => (
        <Button
        className='btn'
      
          onClick={() => handleCompare(record)}
          disabled={isCompared(record.key)}
        >
          Compare
        </Button>
      )
    }
  ];

  return (
    <div className="product-table">
     
      <Table className='table'
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      <Link to="/compare" state={{ compareList }}>
        <Button
        className='btn1'
          style={{ marginTop: 20}}
          
          disabled={compareList.length === 0}
        >
          Go to Compare Products
        </Button>
      </Link>
    </div>
  );
};

export default ProductDetailsPage;
