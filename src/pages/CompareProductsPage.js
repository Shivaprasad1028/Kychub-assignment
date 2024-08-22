import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './CompareProductPage.css';
const CompareProductsPage = () => {
  const location = useLocation();
  const [compareList, setCompareList] = useState(location.state?.compareList || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setAllProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddMore = (product) => {
    if (compareList.length >= 4) {
      alert('You can only compare up to 4 products.');
      return;
    }
    if (compareList.find(item => item.key === product.key)) {
      alert('This product is already in the compare list.');
      return;
    }
    setCompareList(prevList => [...prevList, product]);
    setIsModalVisible(false);
  };

  const handleRemove = (key) => {
    setCompareList(prevList => prevList.filter(product => product.key !== key));
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
      key: 'title'
    },
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Description</span>,
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Price</span>,
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`
    },
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Discount</span>,
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      render: (discount) => `${discount}%`
    },
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Brand</span>,
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Category</span>,
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Action</span>,
      key: 'action',
      render: (_, record) => (
        <Button
          type="danger"
          onClick={() => handleRemove(record.key)}
        >
          Remove
        </Button>
      )
    }
  ];

  const modalColumns = [
    ...columns,
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleAddMore(record)}
          disabled={compareList.find(item => item.key === record.key)}
        >
          Add to Compare
        </Button>
      )
    }
  ];

  return (
    <div className="compare-products">
   <span style={{ fontSize: '26px', fontWeight: 'bold',fontFamily:'sans-serif' }}>Compare Products</span>
      <Table
        columns={columns}
        dataSource={compareList}
        pagination={false}
        rowKey="key"
      />
      <Button
        className='btn1'
        style={{ marginTop: 20 }}
        onClick={() => setIsModalVisible(true)}
      >
        Add More
      </Button>
      <Link to="/">
        <Button  style={{ marginTop: 20, marginLeft: 10 }}   className='btn1'>
          Back to Product Details
        </Button>
      </Link>
      <Modal
        title="Add More Products to Compare"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={1000}
      >
        <Table
          columns={modalColumns}
          dataSource={allProducts}
          loading={loading}
          pagination={{ pageSize: 5 }}
          rowKey="key"
        />
      </Modal>
    </div>
  );
};

export default CompareProductsPage;
