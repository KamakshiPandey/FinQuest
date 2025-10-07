import React from 'react';
import './tempu.css';
import { SlGameController } from "react-icons/sl";
import { Link } from 'react-router-dom';

const gameData = [
    {
        id: 1,
        name: 'Speedy Math',
        fName: 'Speedy',
        lName: 'Math',
        desc: 'Challenge your mind with rapid calculations in Speedy Math! Test your ability to solve mathematical problems quickly and accurately.',
        img: 'https://res.cloudinary.com/du41brgak/image/upload/v1719472047/Gamer_StockVoyager/xnnmqagnrlldxqg9yxvh.jpg',
        url: '/dashboard/gamingHub/speedyMath',
    },
    {
        id: 2,
        name: 'Financial Quiz',
        fName: 'Financial',
        lName: 'Quiz',
        desc: 'Enhance your financial knowledge with our interactive Financial Quiz! Dive into various financial topics and improve your understanding of money management.',
        img: 'https://images.pexels.com/photos/4021794/pexels-photo-4021794.jpeg',
        url: '/dashboard/gamingHub/financialQuiz',
    },
    {
        id: 3,
        name: 'Money Maker',
        fName: 'Money',
        lName: 'Maker',
        desc: 'Predict who will accumulate more wealth in different scenarios in Who Gets More! Sharpen your financial foresight and decision-making skills.',
        img: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        url: '/dashboard/gamingHub/whoGetsMore',
    },
    {
        id: 4,
        name: 'Word Search',
        fName: 'Word',
        lName: 'Search',
        desc: 'Discover finance-related terms hidden in Word Search! Have fun while expanding your financial vocabulary in this educational game.',
        img: 'https://images.pexels.com/photos/695571/pexels-photo-695571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        url: '/dashboard/gamingHub/wordSearch',
    },
];

const GamingCentre = () => {
    return (
        <div className='w-full my-auto'>
            <section className='my-auto mx-auto'>
                <div className="flex flex-row gap-4 w-full h-full">
                    {gameData.map((gcard) => (
                        <div className="card">
                            <Link to={gcard.url} key={gcard.id} className="col-md-4 col-sm-6 col-xs-12 w-full">
                                <div className="cover" style={{ backgroundImage: `url(${gcard.img})` }}>
                                    <h1>{gcard.fName}<br />{gcard.lName}</h1>
                                    <span className="price"><SlGameController className='font-extrabold text-md'/></span>
                                    <div className="card-back">
                                        <div className='w-full h-full  flex items-center justify-between ' style={{ backgroundImage: `url(${gcard.img})` }}>

                                            <button className='text-[#ffff8f] font-extrabold text-xl text-center rotate-y-180'>{gcard.desc}</button>
                                        </div>

                                    
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                
            </section>
        </div>
    );
};

export default GamingCentre;
