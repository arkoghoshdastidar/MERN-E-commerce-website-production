import styles from './Sidebar.module.css';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useNavigate } from 'react-router-dom';
import { MdExpandMore } from 'react-icons/md';
import { AiOutlineWallet } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import {  MdOutlineCreate } from 'react-icons/md';
import { VscBook } from 'react-icons/vsc';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className={styles['sidebar']}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<MdExpandMore />}
                >
                    <div>Products</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div onClick={() => navigate('/admin/all/products')} className={styles['link']}><span><AiOutlineWallet /></span>All Products</div>
                    <div onClick={() => navigate('/admin/create/product')} className={styles['link']}><span><MdOutlineCreate /></span>Create Product</div>
                </AccordionDetails>
            </Accordion>
            <div onClick={() => navigate('/admin/orders')} className={styles['link']}><span><AiOutlineShoppingCart /></span>Orders</div>
            <div onClick={() => navigate('/admin/users')} className={styles['link']}><span><AiOutlineUser /></span>Users</div>
            <div onClick={() => navigate('/dashboard')} className={styles['link']}><span><VscBook /></span>Dashboard</div>
        </div>
    )
}

export default Sidebar;