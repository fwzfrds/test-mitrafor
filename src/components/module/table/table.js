import {
    EyeFilled,
    SearchOutlined
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Table, Space, Input, Button, Modal, Carousel, Spin } from 'antd'
import axios from 'axios'

const TableComp = () => {

    const [data, setData] = useState('')
    const [detailProduct, setDetailProduct] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: 8 }}>
                        <Input
                            autoFocus
                            placeholder={'product name'}
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : [])
                                confirm({ closeDropdown: false })
                            }}
                            onPressEnter={() => {
                                confirm()
                            }}
                            onBlur={() => {
                                confirm()
                            }}
                        >
                        </Input>
                        <div style={{ marginTop: 8, display: 'flex', gap: 5 }}>
                            <Button type={'primary'}
                                onClick={() => {
                                    confirm()
                                }}
                            >
                                Search
                            </Button>
                            <Button
                                onClick={() => {
                                    clearFilters()
                                    confirm()
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                )
            },
            filterIcon: () => {
                return (<SearchOutlined />)
            },
            onFilter: (value, record) => {
                return record.title.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'stock',
            render: (_, record) => (
                <Space size="middle">
                    <EyeFilled
                        style={{ fontSize: 30, cursor: 'pointer' }}
                        onClick={() => handleDetail(record.id)}
                    />
                </Space>
            )
        }
    ]

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://dummyjson.com/products?limit=100&skip=0`)
                console.log(res.data)
                if (res) {
                    setData(res.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchProduct()
    }, [])

    const handleDetail = (id) => {
        console.log(`the product id = ${id}`)
        setDetailProduct(data.products.find(item => item.id === id))
        showModal()
    }

    return (
        <>
            {data.products ?
                <Table
                    columns={columns}
                    dataSource={data.products}
                    pagination={true}
                    scroll={{
                        y: 400,
                    }}
                />
                :
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Spin tip="Loading..." />
                </div>
            }
            <Modal
                title="Product Detail"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <h3>{detailProduct.title}</h3>
                <Carousel
                    autoplay
                    scroll={{
                        y: 400,
                    }}
                >
                    {detailProduct.images && (detailProduct.images).map(img => {
                        return (
                            <div >
                                <div
                                    style={{
                                        width: '100%',
                                        height: 300,
                                        position: 'relative'
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={detailProduct.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </Carousel>
                <div className='desc_product'>
                    {detailProduct.description}
                </div>
                <div
                    className='detail_product'
                >
                    <p><span>Price</span> : {detailProduct.price}</p>
                    <p><span>Stock</span> : {detailProduct.stock}</p>
                    <p><span>Brand</span> : {detailProduct.brand}</p>
                    <p><span>Category</span> : {detailProduct.category}</p>
                    <p><span>Rating</span> : {detailProduct.rating}</p>
                    <p><span>Discount</span> : {detailProduct.discountPercentage}</p>
                </div>
            </Modal>

        </>
    )

}

export default TableComp