import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Winner = () => {


    return (
        <div className="winner-page">
            
            <div className='winner-container'>
                <div className='winner-item-container'>
                    <img src="/assets/images/winner-frame/2.svg" alt="" />
                    <div className='winner-text-frame winner-text-frame-2'>Игрок 1</div>
                </div>
                
                <div className='winner-item-container winner-item-container-1'>
                    <img src="/assets/images/winner-frame/1.svg" alt="" />
                    <div className='winner-text-frame winner-text-frame-1'>Игрок 2</div>
                </div>

                <div className='winner-item-container'>
                    <img src="/assets/images/winner-frame/3.svg" alt="" />
                    <div className='winner-text-frame winner-text-frame-3'>Игрок 3</div>
                </div>

            </div>
            
            <div className='winner-4-item'>
                
                <div className='winner-text-frame winner-text-frame-4'>Игрок 4</div>
                <img src="/assets/images/winner-frame/trash.png" alt="" />
            </div>

            <Link to="/menu" className="lobby-back-to-menu">
                <img src="/assets/icons/back-arrow.svg" alt="Back" />
                <div>Вернуться в меню</div>
            </Link>
        </div>
    );
};

export default Winner;
